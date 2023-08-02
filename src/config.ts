export const environment = process.env.NODE_ENV || 'development';
export const serviceName = process.env.SERVICE_NAME || 'Node-PostgreSQL-Server';
export const port = parseInt(process.env.API_PORT || '4000');
export const corsUrl = process.env.CORS_URL || '*';

export const consoleLog = {
  format: process.env.CONSOLE_LOG_FORMAT || 'plain',
  level: process.env.CONSOLE_LOG_LEVEL || 'info',
};

export const routerLog = {
  active: Boolean(process.env.ROUTER_LOG_ACTIVATION || false),
  format: process.env.ROUTER_LOG_FORMAT || 'tiny',
};

export const parserOptions = {
  json: { limit: '10mb' },
  urlencoded: {
    limit: '10mb',
    extended: true,
    parameterLimit: 50000,
  },
};


export const postgresOptions = {
  user: process.env.POSTGRES_USER || 'opDevUser',
  host: process.env.POSTGRES_HOST || 'postgres-db',
  database: process.env.POSTGRES_DB || 'recipes',
  password: process.env.POSTGRES_PASSWORD || 'topSecret53!',
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : 5432,
  connectionTimeoutMillis: process.env.POSTGRES_CONNECTION_TIMEOUT
    ? parseInt(process.env.POSTGRES_CONNECTION_TIMEOUT, 10)
    : 2000,
  idleTimeoutMillis: process.env.POSTGRES_IDLE_TIMEOUT
    ? parseInt(process.env.POSTGRES_IDLE_TIMEOUT, 10)
    : 3000,
  max: process.env.POSTGRES_POOL_SIZE
    ? parseInt(process.env.POSTGRES_POOL_SIZE, 10)
    : 10,
};


