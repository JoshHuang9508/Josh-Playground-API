export const databaseConfig = {
  database: process.env.DB_NAME || 'MySQL',
  connectionSettings: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'MySQL',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    decimalNumbers: true,
  },
  charset: 'utf8mb4_unicode_ci',
  schema: {
    directory: 'schemas/schema.sql',
  },
  backups: {
    directory: 'backups',
  },
};
