import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  usu_tel: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  usu_senha: string;
}