import { IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export enum Periodo {
  MANHA = 'MANHA',
  TARDE = 'TARDE',
}

export class CreateReservaDto {
    @IsNotEmpty()
    @IsNumber()    
    pro_id: number

    @IsNotEmpty()
    @IsNumber()
    ite_quantidade: number

    @IsNotEmpty()
    @IsEnum(Periodo)
    periodo: Periodo;
}