const Sequelize = require('sequelize');
const Umzug = require('umzug');

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/simple_webapp', {
    dialect: 'postgres'
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

function runMigrations() {
    umzug.up().then(() => {
        console.log('Migrations have been successfully executed!');
    }).catch(error => {
        console.error('Migration failed. Error:', error);
    });
}

runMigrations();
