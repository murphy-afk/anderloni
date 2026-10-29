import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import { env } from './src/config/env.js';

// The migrate engine also needs the retrieval flag for local MySQL 8
// caching_sha2_password accounts, which the adapter supplies as an option.
const url = env.databaseUrl
  ? `${env.databaseUrl}${env.databaseUrl.includes('?') ? '&' : '?'}allowPublicKeyRetrieval=true`
  : undefined;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url,
  },
});
