import 'dotenv/config';

const DEFAULT_PORT = 4000;

function readPort(value) {
  const port = Number.parseInt(value ?? '', 10);
  return Number.isInteger(port) && port > 0 ? port : DEFAULT_PORT;
}

// Connection credentials are stored as separate variables so the .env file
// stays easy to fill in. An explicit DATABASE_URL still wins when present.
function buildDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const host = process.env.DB_HOST;
  const database = process.env.DB_NAME;
  if (!host || !database) {
    return '';
  }

  const user = encodeURIComponent(process.env.DB_USER ?? '');
  const password = encodeURIComponent(process.env.DB_PASSWORD ?? '');
  const port = process.env.DB_PORT ?? '3306';
  return `mysql://${user}:${password}@${host}:${port}/${database}`;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: readPort(process.env.PORT),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  databaseUrl: buildDatabaseUrl(),
};

if (!env.databaseUrl) {
  console.warn(
    'DB_USER, DB_PASSWORD, DB_HOST and DB_NAME are not set. Copy server/.env.example to server/.env before running Prisma commands.',
  );
}
