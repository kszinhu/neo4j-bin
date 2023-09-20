import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';

@Injectable()
export class AppService {
  constructor(private readonly ogmService: OGMService) {}

  async ogmHealthCheck(): Promise<number> {
    const session = this.ogmService.app.readSession();

    return await session
      .run('MATCH (n) RETURN count(*) as amount')
      .then((result) => result.records[0].get('amount'))
      .catch((error) => ({
        message: error,
        code: HttpStatus.SERVICE_UNAVAILABLE,
      }));
  }

  // TODO: ADD METHOD TO GET INFO ABOUT THE SYSTEM (CPU, RAM, ETC)
  // healthCheck(): string {
  //   return 'OK';
  // }
}
