import { IsOptional, IsString, IsIn } from 'class-validator';

export class FilterProdutoDto {
    @IsOptional()
    @IsString()
    campo?: string;

    @IsOptional()
    @IsIn(['asc', 'desc'])
    direcao?: 'asc' | 'desc';
}