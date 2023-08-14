import { Injectable } from '@nestjs/common';
import { OGM } from 'ogm-neo4j/app';

@Injectable()
export class AppService {
  async getOGMHello(OGM: OGM): Promise<string> {
    const session = OGM.readSession();

    const amountNodes: number = await session
      .run('MATCH (n) RETURN count(n) AS count')
      .then((result) => {
        return result.records[0].get('count');
      })
      .catch((error) => {
        console.error(error);
      });

    return `There are ${amountNodes} nodes in the database`;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
