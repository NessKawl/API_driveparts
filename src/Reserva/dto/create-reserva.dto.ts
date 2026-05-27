import { IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export enum Periodo {
  MANHA = 'MANHA',
  TARDE = 'TARDE',
}

export class CreateReservaDto {
  // @IsNotEmpty()
  // @IsNumber()
  // pro_id: number

  @IsNotEmpty()
  @IsString()
  pro_aux_uuid: string;

  @IsNotEmpty()
  @IsNumber()
  ite_qtd: number

  @IsNotEmpty()
  @IsEnum(Periodo)
  periodo: Periodo;
}