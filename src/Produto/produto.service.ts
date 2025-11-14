import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, pro_produto } from 'generated/prisma';
import { CreateProductDto } from './dto/create-product.dto'
import { SearchProdutoDto } from './dto/search-produto.dto';
import { FilterProdutoDto } from './dto/filter-produto.dto'


@Injectable()
export class ProdutoService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAllProducts(): Promise<pro_produto[]> {
    const produtos = await this.prismaService.pro_produto.findMany({
      include: {
        mov_movimentacao_estoque: {
          select: {
            mov_qtd: true,
            mov_tipo: true,
          },
        },
      },
    });

    return produtos.map((p) => {
      const entradas = p.mov_movimentacao_estoque
        .filter((m) => m.mov_tipo === 'COMPRA')
        .reduce((acc, m) => acc + m.mov_qtd, 0);

      const saidas = p.mov_movimentacao_estoque
        .filter((m) => m.mov_tipo === 'VENDA')
        .reduce((acc, m) => acc + m.mov_qtd, 0);

      const estoqueAtual = entradas - saidas;

      return {
        pro_id: p.pro_id,
        pro_nome: p.pro_nome,
        pro_cod: p.pro_cod,
        pro_marca: p.pro_marca,
        pro_valor: p.pro_valor,
        pro_status: p.pro_status,
        pro_caminho_img: p.pro_caminho_img,
        pro_data_criacao: p.pro_data_criacao,
        pro_data_modificacao: p.pro_data_modificacao,
        pro_data_exclusao: p.pro_data_exclusao,
        estoque: estoqueAtual,
      };
    });
  }


  async findOneProduct(where: Prisma.pro_produtoWhereUniqueInput): Promise<any> {
    const produto = await this.prismaService.pro_produto.findUnique({
      where,
      include: {
        mov_movimentacao_estoque: {
          select: {
            mov_qtd: true,
            mov_tipo: true,
          },
        },
      },
    });

    if (!produto) return null;

    const entradas = produto.mov_movimentacao_estoque
      .filter((m) => m.mov_tipo === 'COMPRA')
      .reduce((acc, m) => acc + m.mov_qtd, 0);

    const saidas = produto.mov_movimentacao_estoque
      .filter((m) => m.mov_tipo === 'VENDA')
      .reduce((acc, m) => acc + m.mov_qtd, 0);

    const estoqueAtual = entradas - saidas;

    return {
      ...produto,
      estoque: estoqueAtual,
    };
  }


  async createProduct(data: CreateProductDto): Promise<pro_produto> {
    return this.prismaService.pro_produto.create({ data, });
  }

  async updateProduct(
    where: Prisma.pro_produtoWhereUniqueInput,
    data: Prisma.pro_produtoUpdateInput
  ): Promise<pro_produto> {
    return this.prismaService.pro_produto.update({
      where,
      data
    })
  }


  async buscarProdutosPorNome(termo: string) {
    return this.prismaService.pro_produto.findMany({
      where: {
        pro_nome: {
          contains: termo,
        },
        pro_status: true,
      },

      include: {
        pro_esp: {
          include: {
            esp_especificacao: true,
          },
        },
      },
      take: 10,
      orderBy: { pro_nome: 'asc' },
    });
  }

  async buscarProdutosPorCategoria(categoriaNome: string) {
    return this.prismaService.pro_produto.findMany({
      where: {
        pro_status: true,
        pro_esp: {
          some: {
            esp_especificacao: {
              cat_categoria: {
                cat_nome: {
                  contains: categoriaNome,
                },
              },
            },
          },
        },
      },
      include: {
        pro_esp: {
          include: {
            esp_especificacao: {
              include: {
                cat_categoria: true,
              },
            },
            met_metrica: true,
          },
        },
      },
      take: 20,
      orderBy: { pro_nome: "asc" },
    });
  }


  async FiltrarDadosOrdenados(filterProdutoDto: FilterProdutoDto) {
    const { campo, direcao } = filterProdutoDto;

    const orderBy = campo && direcao ? { [campo]: direcao } : undefined;

    return this.prismaService.pro_produto.findMany({
      orderBy: orderBy,
    })
  }

}
