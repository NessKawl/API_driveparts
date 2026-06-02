import { Body, Controller, Post } from '@nestjs/common';
import { EsqueciSenhaService } from './esqueci-senha.service';

@Controller('esqueci-senha')
export class EsqueciSenhaController {
    constructor(
        private readonly esqueciSenhaService: EsqueciSenhaService,
    ) { }

    @Post('solicitar')
    async solicitarCodigo(
        @Body('telefone') telefone: string,
    ) {
        return this.esqueciSenhaService.solicitarCodigo(
            telefone,
        );
    }

    @Post('validar')
    async validarCodigo(
        @Body('telefone') telefone: string,
        @Body('codigo') codigo: string,
    ) {
        return this.esqueciSenhaService.validarCodigo(
            telefone,
            codigo,
        );
    }

    @Post('redefinir')
    async redefinirSenha(
        @Body('telefone') telefone: string,
        @Body('codigo') codigo: string,
        @Body('novaSenha') novaSenha: string,
    ) {
        return this.esqueciSenhaService
            .redefinirSenha(
                telefone,
                codigo,
                novaSenha,
            );
    }
}