import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, pro_produto } from 'generated/prisma';
import { CreateProductDto } from './dto/create-product.dto'

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
}
