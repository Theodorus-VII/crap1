import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AvatarsService } from './avatars.service';
import { CreateAvatarDto } from './dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'
import path = require('path');
import { UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';
import { User } from '@prisma/client';
import { join } from 'path';
import { of } from 'rxjs';


export const storage = {
    storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`)
        }
    })
}

@UseGuards(JwtGuard)
@Controller('avatars')
export class AvatarsController {
    constructor(private avatarsService: AvatarsService) { }

    // return pf pic
    // READ
    @Get()
    async getAvatar(@GetUser('id') user: User, @Res() res) {
        let userId = user.id;
        const x = this.avatarsService.getAvatar(userId)
        try{
            const ret = (await x).imglink
            return of(res.sendFile(join(process.cwd(), 'uploads/'+ret)))
        } catch(error){
            return ("data not found")
        }
    }



    // CREATE
    // Returns the file pathname. has to be appeneded with the directory to the server?
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', storage))
    async setAvatar(@GetUser('id') user: User,
        // @Body() dto: CreateAvatarDto,
        @UploadedFile() file) {
        console.log(user.id)
        let userId = user.id;
        console.log(userId)
        const fname = file.filename;

        this.avatarsService.setAvatar(fname, user, userId);
        return ({ imagePath: file.filename});
    }


    // UPDATE
    // removes existing pf pic and uploads a new one
    @Patch()
    @UseInterceptors(FileInterceptor('file', storage))
    async updateAvatar(@GetUser('id') user: User,
    @UploadedFile() file) {

        let userId = user.id;
        console.log(userId);
        const x = this.avatarsService.getAvatar(userId)
        const uid = ((await x).userId)
        this.avatarsService.deleteAvatar(uid);
        
        console.log(user.id)
        userId = user.id;
        console.log(userId)
        const fname = file.filename;

        this.avatarsService.setAvatar(fname, user, userId);
        return ({ imagePath: file.filename});
    }



    // DELETE
    // removes existing pf pic
    @Delete()
    async deleteAvatar(@GetUser('id') user: User) {
        let userId = user.id;
        const x = this.avatarsService.getAvatar(userId)
        const uid = ((await x).userId)
        this.avatarsService.deleteAvatar(uid)
    }

}
