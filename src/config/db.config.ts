import { DataSource } from 'typeorm';
import config, { ConfigInterface } from '.';

const configDetails = config as ConfigInterface;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configDetails.db.host,
  port: +configDetails.db.port,
  username: configDetails.db.user,
  password: configDetails.db.password,
  database: configDetails.db.database,
  synchronize: false,
  logging: true,
  entities: ['src/feature/**/*.entity.ts'],
  subscribers: [],
  migrations: ['src/migrations/**/*.ts']
});
