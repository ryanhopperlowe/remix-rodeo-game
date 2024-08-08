import { defineConfig } from 'drizzle-kit';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
}

export default defineConfig({
    schema: './app/db/schema.ts',
    dialect: 'postgresql',
    out: './drizzle',
    dbCredentials: {
        url: connectionString
    },
    migrations: {
        prefix: 'supabase'
    }
});
