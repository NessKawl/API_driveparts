import { VenPeriodo, VenStatus } from "generated/prisma";

class ProdutoReservaDto {
    pro_id: number;
    pro_nome: string;
    pro_valor: number;
    pro_marca: string;
    pro_cod: string;
}

class ItemVendaReservaDto {
    ite_id: number;
    ite_qtd: number;
    ite_valor: number;
    pro_produto: ProdutoReservaDto;
}

export class ReservaHistoricoDto {
    ven_id: number;
    usu_id: number;
    ven_valor: number;
    ven_status: VenStatus;
    ven_pagamento: string;
    ven_periodo: VenPeriodo;
    ven_data: Date;
    ite_itemVenda: ItemVendaReservaDto;
}