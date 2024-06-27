require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const User = require('./models/user');
const balanceRouter = require('./controllers/balanceController');
const errorHandlingMiddleware = require('./middlewares/errorHandling');
const { runMigrations } = require('./migrate');
const app = express();

app.use(bodyParser.json());
app.use('/balance', balanceRouter);
app.use(errorHandlingMiddleware);

async function startApp() {
    try {
        await runMigrations();
        await sequelize.sync();
        await User.findOrCreate({
            where: { id: 1 },
            defaults: { balance: 10000 }
        });
        console.log("Database synced and user initialized");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the application:', error);
        process.exit(1);
    }
}

startApp().catch(error => {
    console.error('Failed to start the application due to an unhandled error:', error);
    process.exit(1);
});
