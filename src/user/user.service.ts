import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { ModUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async editUser(Userid: number, dto: ModUserDto){
        
        const user = await this.prisma.user.update({
            where: {
                id: Userid,
            },
            data: {
                ...dto,
            },
        });

        console.log(user)
        delete user.hash;
        return user;
    }



    async deleteUser(userid: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id: userid,
            }
        })

        if (user.id == userid){
            this.prisma.user.delete({
                where: {
                    id: userid,
                }
            })
        }
    }
}
