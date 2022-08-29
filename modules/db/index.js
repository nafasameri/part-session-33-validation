const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    database: 'db1',
    password: '123123',
    host: '127.0.0.1',
    port: '5432',
    max: 20,
    idleTimeoutMillis: 2
});