import { Command, CommandRunner, Option } from 'nest-commander';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';

import { Logger } from '@nestjs/common';
import { resolve } from 'path';

interface SeedCommandOptions {
  files: string[];
  database: string;
}

interface Header<K extends string = string> {
  key: K; // Header key
  type: 'string' | 'number' | 'date';
}

type CsvECommerceBehavior = {
  event_time: Date; // ISO Date
  event_type: 'view' | 'cart' | 'purchase' | 'remove_from_cart';
  product_id: number;
  category_id: number;
  category_code: string | null;
  brand: string | null;
  price: number;
  user_id: number;
  user_session: string; // UUID (v4)
};

// run "sudo nano /etc/neo4j/neo4j.conf" and comment the line "dbms.directories.import=import"

@Command({
  name: 'seed',
  description: 'Seed database with data',
})
export class SeedCommand extends CommandRunner {
  #csvHeaders: Header<keyof CsvECommerceBehavior & string>[] = [
    {
      key: 'event_time',
      type: 'date',
    },
    {
      key: 'event_type',
      type: 'string',
    },
    {
      key: 'product_id',
      type: 'number',
    },
    {
      key: 'category_id',
      type: 'number',
    },
    {
      key: 'category_code',
      type: 'string',
    },
    {
      key: 'brand',
      type: 'string',
    },
    {
      key: 'price',
      type: 'number',
    },
    {
      key: 'user_id',
      type: 'string',
    },
    {
      key: 'user_session',
      type: 'string',
    },
  ];

  constructor(private readonly OGM: OGMService) {
    super();
  }

  async run(_args: string[], options?: SeedCommandOptions): Promise<void> {
    Logger.log('Seeding database ...');

    const { files = [], database } = options;

    if (!files.length) return;

    const queries: string[] = [];

    files.forEach(async (file) => {
      const filePath = resolve(process.cwd(), file);

      const query = `
        ${database ? `USE ${database}` : ''}
        LOAD CSV WITH HEADERS FROM 'file:///${filePath}' AS row
        WITH row
        MERGE (product:Product { id: toInteger(row.product_id) })
        ON CREATE SET product.brand = row.brand,
                      product.price = toFloat(row.price)
        MERGE (session:Session { id: row.user_session })
        // Create relationship VIEW between product and event if event_type is view
        FOREACH (ignoreMe IN CASE WHEN row.event_type = 'view' THEN [1] ELSE [] END |
          // 2023-11-01 00:00:00 UTC => 2023-11-01T00:00:00.000Z (Convert to ISO Date)
          MERGE (session)-[:VIEW { type: row.event_type, event_time: datetime(REPLACE((REPLACE(row.event_time, ' UTC', '') + 'Z'), ' ', 'T')) }]->(product)
        )
        // Create relationship CART between product and event if event_type is cart
        FOREACH (ignoreMe IN CASE WHEN row.event_type = 'cart' THEN [1] ELSE [] END |
          // 2023-11-01 00:00:00 UTC => 2023-11-01T00:00:00.000Z (Convert to ISO Date)
          MERGE (session)-[:CART { type: row.event_type, event_time: datetime(REPLACE((REPLACE(row.event_time, ' UTC', '') + 'Z'), ' ', 'T')) }]->(product)
        )
        // Create relationship PURCHASE between product and event if event_type is purchase
        FOREACH (ignoreMe IN CASE WHEN row.event_type = 'purchase' THEN [1] ELSE [] END |
          MERGE (session)-[:PURCHASE { type: row.event_type, event_time: datetime(REPLACE((REPLACE(row.event_time, ' UTC', '') + 'Z'), ' ', 'T')) }]->(product)
        )
        // Create relationship REMOVE_FROM_CART between product and event if event_type is remove_from_cart
        FOREACH (ignoreMe IN CASE WHEN row.event_type = 'remove_from_cart' THEN [1] ELSE [] END | 
          MERGE (session)-[:REMOVE_FROM_CART { type: row.event_type, event_time: datetime(REPLACE((REPLACE(row.event_time, ' UTC', '') + 'Z'), ' ', 'T')) }]->(product)
        )
        MERGE (user:User { id: toInteger(row.user_id) })
        MERGE (user)-[:HAS]->(session)
        // category_code could be null in the csv file
        MERGE (category:Category { id: toInteger(row.category_id) })
        ON CREATE SET category.code = row.category_code
        MERGE (product)-[:BELONGS_TO]->(category)
        `;

      queries.push(query);
    });

    // await this.#executeQueries(queries);

    await this.OGM.ogm
      .batch(queries)
      .then(() => {
        Logger.log('Database seeded successfully');
      })
      .catch((error) => {
        Logger.error(error);
      })
      .finally(() => {
        Logger.debug('Seeding database finished');
      });
  }

  #executeQueries = async (queries: string[]): Promise<void> => {
    const session = this.OGM.ogm.writeSession();

    const transaction = session.beginTransaction();

    await Promise.all(
      queries.map((query) => {
        if (!query) throw new Error('Query is required');

        try {
          return transaction
            .run(query)
            .then((res) => {
              Logger.debug(res);
            })
            .catch((error) => {
              Logger.error(error);
            });
        } catch (error: unknown) {
          Logger.error(error);
        }
      }),
    );
  };

  @Option({
    description: 'CSV files to seed database',
    flags: '-c, --files <csv...>',
  })
  parseCsv(file: string, filesAccumulator: string[] = []): string[] {
    filesAccumulator.push(file);

    return filesAccumulator;
  }

  @Option({
    description: 'Select a database',
    flags: '-d, --database <database>',
  })
  parseDatabase(database: string): string {
    return database;
  }
}
