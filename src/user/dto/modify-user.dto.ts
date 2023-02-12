import { IsNumber, isNumber, IsOptional, IsString } from "class-validator"

export class ModUserDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsNumber()
    @IsOptional()
    age?: number

    @IsString()
    @IsOptional()
    nationality?: string

}

