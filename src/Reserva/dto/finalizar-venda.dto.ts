import { IsEnum, IsOptional, IsNumber, Min } from 'class-validator';

export enum FormaPagamento {
  DINHEIRO = 'Dinheiro',
  CARTAO_CREDITO = 'Cartão de Crédito',
}

export class FinalizarVendaDto {
  @IsEnum(FormaPagamento)
  formaPagamento: FormaPagamento;
}
