const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/simple_webapp', { logging: false });
app.use(bodyParser.json());

const User = sequelize.define('user', {
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    timestamps: false
});

sequelize.sync().then(() => {
    User.findOrCreate({
        where: {id: 1},
        defaults: {balance: 10000}
    });
    console.log("Database synced");
});

app.post('/updateBalance', async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const result = await sequelize.transaction(async (t) => {
            const user = await User.findByPk(userId, { transaction: t });
            if (!user) {
                throw new Error('User not found');
            }
            if (user.balance + amount < 0) {
                throw new Error('Insufficient funds');
            }
            user.balance += amount;
            await user.save({ transaction: t });
            return user.balance;
        });
        res.send({ newBalance: result });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});