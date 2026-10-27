import 'dotenv/config';

const DEFAULT_PORT = 4000;

function readPort(value) {
  const port = Number.parseInt(value ?? '', 10);
  return Number.isInteger(port) && port > 0 ? port : DEFAULT_PORT;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: readPort(process.env.PORT),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL ?? '',
};

if (!env.databaseUrl) {
  console.warn(
    'DATABASE_URL is not set. Copy server/.env.example to server/.env before running Prisma commands.',
  );
}
