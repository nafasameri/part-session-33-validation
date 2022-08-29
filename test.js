const { Pool } = require('pg');

const pool = new Pool({
    user: 'synergy',
    host: '192.168.5.121',
    database: 'college',
    password: '&6Tw3C0V4q@w',
    schema: 'synergy',
    port: 5432,
});

(async () => {
    // const query = 'select * from categories';
    const categoryId = 6;
    const catName = 'جاز';
    // const res = await pool.query('select * from categories where id=$1 and name=$2', [id,firstName]);
    // const res = await pool.query('select * from categories where id=$1 & name=$2', [categoryId, catName]);
    // const res = await pool.query('insert into categories(name) values ($1)', [catName]);
    // const res = await pool.query('delete From categories where id=$1', [categoryId]);

    console.log(res.rowCount);
    pool.end();
})();