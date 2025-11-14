import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Prisma, pro_produto } from 'generated/prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { parse } from 'path';
import { SearchProdutoDto } from './dto/search-produto.dto';
import { FilterProdutoDto } from './dto/filter-produto.dto';


@Controller('produto')
export class ProdutoController {
    constructor(private produtoService: ProdutoService) { }

    @Get()
    async findAllProducts(): Promise<pro_produto[]> {
        return this.produtoService.findAllProducts()
    }

    @Get("all")
    async BuscaProdutos(): Promise<pro_produto[]> {
        return this.produtoService.BuscaProdutos()
    }
    @Get('search')
    async searchProdutos(@Query('termo') termo: string) {
        return this.produtoService.buscarProdutosPorNome(termo);
    }

    @Get("categoria")
    async getPorCategoria(@Query("categoria") categoria: string) {
        return this.produtoService.buscarProdutosPorCategoria(categoria);
    }


    @Get('filter')
    async filterProdutos(@Query() filterProdutoDto: FilterProdutoDto) {
        return this.produtoService.FiltrarDadosOrdenados(filterProdutoDto)
    }

    @Get(':id')
    async findOneProduct(
        @Param('id', ParseIntPipe) pro_id: number
    ): Promise<pro_produto> {

        const product = await this.produtoService.findOneProduct({ pro_id });

        if (!product) {
            throw new NotFoundException(`Produto com ID ${pro_id} não encontrado`);
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
