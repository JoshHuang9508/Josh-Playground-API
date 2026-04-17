import mysql, { PoolConnection } from 'mysql2/promise';
import { AsyncLocalStorage } from 'async_hooks';

import { databaseConfig } from '@/configs';

import Logger from '@/logger';

const txStorage = new AsyncLocalStorage<PoolConnection>();

export default class Database {
  static PART = 'DATABASE';

  static pool: mysql.Pool;

  static async setup(): Promise<void> {
    new Logger(this.PART).info('Initializing Database...');

    this.pool = mysql.createPool(databaseConfig.connectionSettings);

    new Logger(this.PART).info(`Database initialized with ${databaseConfig.connectionSettings.database} database`);
  }

  static async query<T = any[]>(sql: string, params?: any[]): Promise<T> {
    const connection = txStorage.getStore() || Database.pool;
    const [rows] = await connection.query(sql, params);
    return rows as T;
  }

  static async execute(sql: string, params?: any[]): Promise<mysql.ResultSetHeader> {
    const connection = txStorage.getStore() ?? Database.pool;
    const [result] = await connection.query(sql, params);
    return result as mysql.ResultSetHeader;
  }

  static async transaction<T = any>(fn: () => Promise<T>): Promise<T> {
    if (txStorage.getStore()) {
      return await fn();
    }

    const connection = await Database.pool.getConnection();
    try {
      await connection.beginTransaction();
      return await txStorage.run(connection, async () => {
        const result = await fn();
        await connection.commit();
        return result;
      });
    } catch (e) {
      await connection.rollback();
      throw e;
    } finally {
      connection.release();
    }
  }
}
