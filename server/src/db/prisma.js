// The Prisma 7 client generator emits TypeScript, loaded by the Node.js
// native type stripping available since Node 22.18 and 23.6.
import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { env } from '../config/env.js';

// Prisma 7 uses a driver adapter instead of the Rust query engine.
const adapter = new PrismaMariaDb(env.databaseUrl, {
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });
