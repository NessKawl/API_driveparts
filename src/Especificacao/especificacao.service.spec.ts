import { Test, TestingModule } from '@nestjs/testing';
import { EspecificacaoService } from './especificacao.service';

describe('EspecificacaoService', () => {
  let service: EspecificacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EspecificacaoService],
    }).compile();

    service = module.get<EspecificacaoService>(EspecificacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
