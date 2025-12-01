import { Test, TestingModule } from '@nestjs/testing';
import { EspecificacaoController } from './especificacao.controller';

describe('EspecificacaoController', () => {
  let controller: EspecificacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspecificacaoController],
    }).compile();

    controller = module.get<EspecificacaoController>(EspecificacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
