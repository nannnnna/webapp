const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Убедитесь, что путь правильный

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    tableName: 'users', // Указываем имя таблицы, если оно отличается от имени модели
    timestamps: false
});

module.exports = User;
