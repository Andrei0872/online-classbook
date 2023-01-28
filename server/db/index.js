import pg from 'pg'

const { Pool } = pg;

const dbConfig = {
  user: 'andrei',
  host: 'localhost',
  database: 'online_classbook',
  password: 'pass123',
  port: 5432,
}

export const pool = new Pool(dbConfig);

try {
  await new Promise((resolve, reject) => {
    pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        return reject(err);
      }

      resolve(res);
    });
  })

  console.log('Successfully connected to the database.');
} catch (err) {
  console.error('An error occurred while connecting to the database');
  pool.end();
  process.exit(1);
}