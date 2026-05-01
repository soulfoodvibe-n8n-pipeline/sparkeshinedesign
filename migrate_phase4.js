const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function runMigration() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("Connected to database. Running Phase 4 Schema Updates...");

    // Add theme_index and event_type columns
    await client.query(`
      ALTER TABLE public.events 
      ADD COLUMN IF NOT EXISTS theme_index INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS event_type TEXT DEFAULT 'wedding';
    `);

    console.log("SUCCESS! theme_index and event_type added to public.events.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

runMigration();
