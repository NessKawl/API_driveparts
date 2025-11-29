import { IsString, IsNotEmpty, IsDate, IsNumber, IsBoolean } from 'class-validator';

export class createProEspDto {

  @IsString()
  @IsNotEmpty()
  pro_id: number;

  @IsNotEmpty()
  @IsNumber()
  esp_id: number;
  
  @IsNotEmpty()
  @IsString()
  pro_esp_valor: string;

  @IsNotEmpty()
  @IsNumber()
  met_id: number;
}