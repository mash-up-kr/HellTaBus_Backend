import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as path from 'path';

export function getConfig(): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 3309,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'hell_ta_bus',
    entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
    migrations: [__dirname + '/src/migrations/*.ts'],
    cli: {
      migrationsDir: __dirname + '/src/migrations',
    },
    autoLoadEntities: true,
    charset: 'utf8mb4',
    synchronize: false,
  };
}
