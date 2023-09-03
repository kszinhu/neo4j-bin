import { Test, TestingModule } from '@nestjs/testing';
import { OGMService } from '../../core/database/ogm-neo4j/ogm.service';

describe('OGMService', () => {
  let service: OGMService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OGMService],
    }).compile();

    service = module.get<OGMService>(OGMService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
