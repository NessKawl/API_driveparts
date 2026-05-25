import { IsNotEmpty, IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
        @IsNotEmpty()
        @IsString()
        usu_nome: string;

        @IsNotEmpty()
        @IsString()
        usu_tel: string

        @IsNotEmpty()
        @IsString()
        @MinLength(8)
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
            message: 'A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.'
        })
        usu_senha: string
}