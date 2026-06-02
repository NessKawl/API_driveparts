import { Test, TestingModule } from '@nestjs/testing';
import { EsqueciSenhaController } from './esqueci-senha.controller';

describe('EsqueciSenhaController', () => {
  let controller: EsqueciSenhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsqueciSenhaController],
    }).compile();

    controller = module.get<EsqueciSenhaController>(EsqueciSenhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
