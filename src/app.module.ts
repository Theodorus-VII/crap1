import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AvatarsController } from './avatars/avatars.controller';
import { AvatarsService } from './avatars/avatars.service';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AvatarsController],
  providers: [AvatarsService],
})
export class AppModule { }
