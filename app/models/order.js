const { dbConn } = require('../../config/database');
const { DataTypes } =  require('sequelize');
const { User } = require('./user');
const { Meal } = require('./meal');

const Order = dbConn.define('orders', {

    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    meal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    customer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    totalCost: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null
    }

},{
    timestamps: true
});

Order.sync();

module.exports = {
    Order
}