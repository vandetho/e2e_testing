import { CommandFactory } from 'nest-commander';
import { CliAppModule } from './cli-app.module';

async function bootstrap() {
  await CommandFactory.run(CliAppModule, {
    logger: ['warn', 'error'],
  });
}

bootstrap();
