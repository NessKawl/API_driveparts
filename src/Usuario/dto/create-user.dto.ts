import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
        @IsNotEmpty()
        @IsString()
        usu_nome: string;

        @IsNotEmpty()
        @IsString()
        usu_tel: string

        @IsNotEmpty()
        @IsString()
        @MinLength(6)
        usu_senha: string
}