import { IsString, IsNotEmpty, IsDate, IsNumber, IsBoolean, IsArray, ArrayMinSize } from 'class-validator';

export class CreateEspecificacaoDto {

  @IsArray()
  @IsString({ each: true })
  esp_nome: string[];

  @IsNotEmpty()
  @IsNumber()
  cat_id: number;

}