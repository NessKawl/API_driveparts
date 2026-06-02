import { Test, TestingModule } from '@nestjs/testing';
import { EsqueciSenhaService } from './esqueci-senha.service';

describe('EsqueciSenhaService', () => {
  let service: EsqueciSenhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EsqueciSenhaService],
    }).compile();

    service = module.get<EsqueciSenhaService>(EsqueciSenhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
