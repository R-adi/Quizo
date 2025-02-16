// src/config/db.ts
import pg from 'pg';
import 'dotenv/config';
const pool = new pg.Pool({
    // Password you set during installation
    connectionString: process.env.DB_URL, // Use the connection string
    ssl: { rejectUnauthorized: false }, // Required for Render
});
export default pool;
