class ProdutoReservaDto {
    pro_id: number;
    pro_nome: string;
    pro_valor: number;
    pro_tipo: string;
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
    vend_status: string;
    ven_pagamento: string;
    ven_periodo: string;
    ven_data: Date;
    ite_itemVenda: ItemVendaReservaDto;
}