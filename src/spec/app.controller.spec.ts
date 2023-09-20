import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { response } from 'express';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('#healthCheck', () => {
    it('should return "OK"', () => {
      const appController = app.get(AppController);

      expect(appController.healthCheck(response)).toBe({ message: 'OK' });
    });
  });
});
