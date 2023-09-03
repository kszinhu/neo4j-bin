import { CommandFactory } from 'nest-commander';
import { CommandsModule } from 'modules/commands/commands.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  await CommandFactory.run(CommandsModule, [
    'warn',
    'error',
    'debug',
    'log',
    'verbose',
  ]);
}

bootstrap()
  .then(async (app) => {
    process.exit(0);
  })
  .catch((why) => {
    Logger.error(`server failed to start command`, why);
    process.exit(1);
  });
