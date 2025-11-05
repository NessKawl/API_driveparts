import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, pro_produto } from 'generated/prisma';
import { CreateProductDto } from './dto/create-product.dto'
import { SearchProdutoDto } from './dto/search-produto.dto';


@Injectable()
export class ProdutoService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAllProducts(): Promise<pro_produto[]> {
        return this.prismaService.pro_produto.findMany()
    }

    async findOneProduct(where: Prisma.pro_produtoWhereUniqueInput): Promise<pro_produto | null> {
        return this.prismaService.pro_produto.findUnique({
            where,
        })
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
        produto_configuracoes: {
          include: {
            con_configuracoes: true, 
          },
        },
      },
      take: 10,
      orderBy: { pro_nome: 'asc' },
    });
}
}
