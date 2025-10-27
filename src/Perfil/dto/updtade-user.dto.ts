import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    usu_tel: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    usu_senha: string
}