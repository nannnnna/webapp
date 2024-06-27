const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 }
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
