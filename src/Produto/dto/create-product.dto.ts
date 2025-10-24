import { IsString, IsNotEmpty, IsDate, IsNumber, IsBoolean, IsEnum } from 'class-validator';

export enum Tipo {
    FREIO = 'FREIO',
    MOTOR = 'MOTOR',
    SUSPENSAO = 'SUSPENSAO',
    TRANSMISSAO = 'TRANSMISSAO',
    LATARIA = 'LATARIA',
    ACESSORIOS = 'ACESSORIOS',
    ELETRICA = 'ELTRICA',
}

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
}