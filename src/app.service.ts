import { HttpStatus, Injectable } from '@nestjs/common';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';

import { uptime, hostname, cpus, totalmem, freemem } from 'os';

@Injectable()
export class AppService {
  constructor(private readonly ogmService: OGMService) {}

  #formatUptime(uptimeSeconds: number): string {
    return `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor(
      (uptimeSeconds % 3600) / 60,
    )}m ${Math.floor((uptimeSeconds % 3600) % 60)}s`;
  }

  #formatMemory(memory: number): string {
    return `${Math.floor(memory / 1024 / 1024)} MB`;
  }

  async ogmHealthCheck(): Promise<Record<string, any>> {
    const session = this.ogmService.app.readSession();

    return await session
      .run('MATCH (n) RETURN count(*) as amount')
      .then((result) => ({
        amount: result.records[0].get('amount'),
        database: result.summary.database.name,
      }))
      .catch((error) => ({
        message: error,
        code: HttpStatus.SERVICE_UNAVAILABLE,
      }));
  }

  hostInfo(): Record<string, any> {
    const uptimeSeconds = uptime();

    return {
      uptime: this.#formatUptime(uptimeSeconds),
      hostname: hostname(),
      cpus: cpus().length,
      totalmem: this.#formatMemory(totalmem()),
      freemem: this.#formatMemory(freemem()),
    };
  }
}
