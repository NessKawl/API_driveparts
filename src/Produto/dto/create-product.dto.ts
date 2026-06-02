import { IsString, IsNotEmpty, IsDate, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  pro_nome: string;

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

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pro_qtd?: number;

  @IsOptional()
  @IsString()
  pro_caminho_img?: string | null;
}