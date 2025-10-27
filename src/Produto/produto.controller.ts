import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Prisma, pro_produto } from 'generated/prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { parse } from 'path';

@Controller('produto')
export class ProdutoController {
    constructor(private produtoService: ProdutoService) { }

    @Get()
    async findAllProducts(): Promise<pro_produto[]> {
        return this.produtoService.findAllProducts()
    }

    @Get(':id')
    async findOneProduct(@Param('id') pro_id: string): Promise<pro_produto> {
        const idNumber = parseInt(pro_id, 10)

        const product = await this.produtoService.findOneProduct(
            { pro_id: idNumber }
        )

        if (!product) {
            throw new NotFoundException(`Produto com ID ${pro_id} não encontrado`)
        }

        return product;
    }

    @Post('cadastro')
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.produtoService.createProduct(createProductDto);
    }

        @Patch('atualiza/:id')
        async updateProduct(@Param('id') pro_id: string, @Body() data: Prisma.pro_produtoUpdateInput): Promise<pro_produto> {

            const idNumber = parseInt(pro_id, 10)

            return this.produtoService.updateProduct(
                { pro_id: idNumber },
                data
            )
        }
}
