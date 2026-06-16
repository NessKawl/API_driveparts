import { IsEnum, IsOptional, IsNumber, Min } from 'class-validator';

export enum FormaPagamento {
    DINHEIRO = 'Dinheiro',
    CARTAO_DEBITO = 'Cartão de Débito',
    CARTAO_CREDITO = 'Cartão de Crédito',
    PIX = 'PIX',
}
export class FinalizarVendaDto {
  @IsEnum(FormaPagamento)
  formaPagamento: FormaPagamento;
}
