import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as path from 'path';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'rds-helltabus-an2.cf6jbqhlm3ny.ap-northeast-2.rds.amazonaws.com',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root1234',
  database: process.env.DB_NAME || 'hell_ta_bus',
  entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: {
    migrationsDir: __dirname + '/src/migrations',
  },
  autoLoadEntities: true,
  timezone: 'Z',
  charset: 'utf8mb4',
  synchronize: false,
};

export = config;
