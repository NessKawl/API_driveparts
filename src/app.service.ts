import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return (

      `
      <h1><strong>API DRIVE PARTS</strong></h1>
      
      <h3><strong>ROTAS</strong></h3>

      <p><strong>ROTAS PRODUTO</strong></p>
      <p>/produto - GET</p> 
      <p>/produto/:id - GET</p> 
      <p>/produto/cadastro - POST</p>

      <br>

      <p><strong>ROTAS CAD/LOGIN</strong></p>
      <p>/auth/register - POST</p> 
      <p>/auth/login - POST</p>

      <br>

      <p><strong>ROTAS PERFIL</strong></p>
      <p>/perfil/atualizar - PATCH</p> 

      <br>

      <p><strong>ROTAS USUARIO</strong></p>
      <p>/usuario - GET</p>
      <p>/usuario/:id - GET</p>

      `
    );
  }
}
