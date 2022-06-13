require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: '12345678',
    database: 'postgres',
    host: '127.0.0.1',
    dialect: 'postgresql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'evently',
    password: process.env.DB_PASSWORD,
    database: 'evently',
    host: 'dpg-ca7nlt3vog4paveah6sg-a.singapore-postgres.render.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
