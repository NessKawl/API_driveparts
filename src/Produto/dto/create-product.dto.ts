import { IsString, IsNotEmpty, IsDate, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  pro_nome: string;

  @IsString()
  @IsNotEmpty()
  pro_desc: string;

  @IsNotEmpty()
  @IsNumber()
  pro_valor: number;

  @IsString()
  @IsNotEmpty()
  pro_marca: string;

  @IsString()
  @IsNotEmpty()
  pro_cod: string;

  @IsBoolean()
  pro_status: boolean;
}