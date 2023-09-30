import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ParseArgsConfig, parseArgs } from 'util';

const args = ['-e', '--environment'];
const options = {
  environment: {
    type: 'string',
    short: 'e',
  },
};

const prisma = new PrismaClient();

async function main() {
  Logger.log('Seeding...');

  const {
    values: { environment },
  } = parseArgs({ args, options } as ParseArgsConfig) as unknown as {
    values: { environment: string };
  };

  switch (environment) {
    case 'development':
      /** data for your development */
      break;
    case 'test':
      /** data for your test environment */
      break;
    default:
      break;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (why) => {
    console.error(why);
    await prisma.$disconnect();
  })
  .finally(() => {
    process.exit(1);
  });
