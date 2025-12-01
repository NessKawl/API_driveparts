import { IsNotEmpty, IsNumber, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class EspItemDto {
  @IsNumber()
  esp_id: number;

  @IsString()
  pro_esp_valor: string;

  @IsNumber()
  met_id: number
}

export class createProEspDto {

  @IsNumber()
  @IsNotEmpty()
  pro_id: number;

  @IsNumber()
  @IsNotEmpty()
  met_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EspItemDto)
  esp: EspItemDto[];
}
