const { Sequelize, sequelize } = require('../../config/sequelize');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    productPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    productCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Order;
