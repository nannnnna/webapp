module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        }
    });
};
