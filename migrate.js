require('dotenv').config();
const Sequelize = require('sequelize');
const Umzug = require('umzug');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false
});

const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize
    },
    migrations: {
        path: 'migrations',
        pattern: /\.js$/,
        params: [
            sequelize.getQueryInterface(),
            Sequelize
        ]
    },
    logging: function() {
        console.log.apply(null, arguments);
    },
});

async function runMigrations() {
    try {
        await umzug.up();
        console.log('Migrations have been successfully executed!');
    } catch (error) {
        console.error('Migration failed. Error:', error);
        throw error;
    }
}

module.exports = { runMigrations };
