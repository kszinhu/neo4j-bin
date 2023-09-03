import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OGMModule } from './core/database/ogm-neo4j/ogm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jConfig } from './core/database/ogm-neo4j/ogm.interface';
import { UsersModule } from 'modules/models/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OGMModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<Neo4jConfig> => ({
        connectionString: configService.get<string>('NEO4J_CONNECTION_STRING'),
        database: configService.get<string>('NEO4J_DATABASE'),
        password: configService.get<string>('NEO4J_PASSWORD'),
        username: configService.get<string>('NEO4J_USERNAME'),
        config: configService.get<object>('NEO4J_CONFIG'),
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}