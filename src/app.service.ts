import { Injectable } from '@nestjs/common';

import { uptime, hostname, cpus, totalmem, freemem } from 'os';

@Injectable()
export class AppService {
  #formatUptime(uptimeSeconds: number): string {
    return `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor(
      (uptimeSeconds % 3600) / 60,
    )}m ${Math.floor((uptimeSeconds % 3600) % 60)}s`;
  }

  #formatMemory(memory: number): string {
    return `${Math.floor(memory / 1024 / 1024)} MB`;
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
