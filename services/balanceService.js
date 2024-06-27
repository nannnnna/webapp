const sequelize = require('../db');
const User = require('../models/user');
const { Op } = require('sequelize');

async function updateBalance(userId, amount) {
    return sequelize.transaction(async (t) => {
        let user = await User.findByPk(userId, { transaction: t });
        if (!user) throw new Error('User not found');
        if (user.balance + amount < 0) throw new Error('Insufficient funds');

        const [updated] = await User.update(
            { balance: sequelize.literal(`balance + ${amount}`) },
            { where: { id: userId, balance: { [Op.gte]: -amount } }, transaction: t }
        );

        if (!updated) throw new Error('Update failed due to concurrent modification');

        return (await User.findByPk(userId, { transaction: t })).balance;
    });
}

module.exports = {
    updateBalance
};
