require('dotenv').config();
const Umzug = require('umzug');
const sequelize = require('./db'); // Import the sequelize instance

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
            sequelize.constructor
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
