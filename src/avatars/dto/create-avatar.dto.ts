import { IsNotEmpty, IsString } from "class-validator";

export class CreateAvatarDto{
    @IsString()
    @IsNotEmpty()
    imglink: string

}