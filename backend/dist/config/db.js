// src/config/db.ts
import pg from 'pg';
import 'dotenv/config';
const pool = new pg.Pool({
    user: process.env.DB_USER || 'postgres', // Default user
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'quizo',
    password: process.env.DB_PASSWORD || 'your_password', // Password you set during installation
    port: parseInt(process.env.DB_PORT || '5432'),
});
export default pool;
