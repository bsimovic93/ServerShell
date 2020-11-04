const Sequelize = require('sequelize');

require('dotenv').config({path: __dirname + '/.env'});

module.exports =  new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DIALECT
        }
    );
