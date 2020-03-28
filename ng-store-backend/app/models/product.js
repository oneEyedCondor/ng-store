const { Sequelize, sequelize } = require('../../config/sequelize');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.CHAR(25),
        allowNull: false
    },
    manufacturer: {
        type: Sequelize.CHAR(25),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'No description'
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
});

module.exports = Product;