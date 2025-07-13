import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow<string>('DB_HOST'),
  port: configService.getOrThrow<number>('DB_PORT'),
  username: configService.getOrThrow<string>('DB_USER'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  database: configService.getOrThrow<string>('DB_DATABASE'),
  ssl: configService.getOrThrow<boolean>('SSL_MODE'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: process.env.ENV !== 'production',
  logging: process.env.ENV !== 'production',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
