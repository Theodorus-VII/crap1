import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<{
        user_id: number;
        access_token: string;
    }>;
    signin(dto: AuthDto): Promise<{
        user_id: number;
        access_token: string;
    }>;
    signToken(id: number, email: string): Promise<{
        user_id: number;
        access_token: string;
    }>;
}
