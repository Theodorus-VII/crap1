import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";



@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async signup(dto: AuthDto) {
        // hash password
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    nationality: 's',
                    name: 's',
                    age: 2
                },
            })


            return this.signToken(user.id, user.email);
        } catch (error) {
            console.log(error.code)
            if (error) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'There is already an account assigned to this email',
                    );
                }
            }
            throw error;
        }
    }


    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            throw new ForbiddenException(
                'Incorrect Credentials',
            );
        }

        // pass comparison
        const match = await argon.verify(user.hash, dto.password);
        if (!match) {
            throw new ForbiddenException(
                'Incorrect Credentials',
            );
        }
        return this.signToken(user.id, user.email);
    }

    async signToken(id: number, email: string){
        const data = {
            sub: id,
            email
        };
        const secret = this.config.get("JWT_SECRET");

        const access_token = await this.jwt.signAsync(data, {
            expiresIn: '90m',
            secret
        })

        // console.log(access_token)
        return {
            user_id: id,
            access_token: access_token
        };
    }
}