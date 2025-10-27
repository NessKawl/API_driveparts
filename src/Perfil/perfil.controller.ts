import { Body, Controller, Patch, UseGuards, Req, Param, } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { UpdateUserDto } from './dto/updtade-user.dto';
import { Prisma, usu_usuario } from 'generated/prisma';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('perfil')
export class PerfilController {
    constructor(private readonly perfilService: PerfilService) { }

    @UseGuards(JwtAuthGuard)
    @Patch('atualizar')
    async updatePerfil(@Req() req, @Body() dto: UpdateUserDto) {
        const idNumber = req.user.id;

        return this.perfilService.updatePerfil(
            idNumber, dto
        )
    }

}
