const Sequelize = require('sequelize');
const env = require('dotenv');

const sequelize = new Sequelize('coiffeur', 'root', 'Kabil@1997', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    logging: true
});

module.exports = sequelize;