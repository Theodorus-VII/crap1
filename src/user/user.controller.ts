import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Body, Delete, Patch } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ModUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private UserService: UserService){}

    // endpoint that reads stored user information to display it
    // returns the user without the hash
    // READ
    @Get('me')
    getMe(@GetUser() user: User) {
        return {
            user: user,
        }
    }

    

    // endpoint to update stored user info. updates all values that are provided by the user
    // other fields are untouched
    // Patch request to /users
    // UPDATE
    @Patch()
    editUser(
        @GetUser('id') user: User,
        @Body() dto: ModUserDto){
            const uid = user.id
        return this.UserService.editUser(uid, dto);
    }



    // DELETE USER SHOULD GO HERE
    // DELETE
    @Delete()
    deleteUser(@GetUser('id') user: User){
        const uid = user.id
        return this.UserService.deleteUser(uid);
    }
    
}
