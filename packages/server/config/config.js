require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: '123Qazwsx!@#',
    database: DB_NAME,
    host: DB_HOST,
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
