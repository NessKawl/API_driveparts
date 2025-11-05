import { IsOptional, IsString } from "class-validator";

export class SearchProdutoDto {
  @IsOptional()
  @IsString()
  termo?: string;
}
