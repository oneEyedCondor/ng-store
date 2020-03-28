const { Sequelize, sequelize } = require('../../config/sequelize');

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
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

module.exports = Comment;