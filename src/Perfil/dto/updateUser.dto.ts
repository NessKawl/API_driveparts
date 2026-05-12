// update-profile.dto.ts
import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    nome?: string;

    @IsOptional()
    @MinLength(6)
    senha?: string;
}