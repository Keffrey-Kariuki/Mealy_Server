// MEAL
// ID, NAME, DESCRIPTION, PRICE, CATERER
const { dbConn } = require('../../config/database');
const { DataTypes } =  require('sequelize');
const { User } = require('./user');

const Meal = dbConn.define('meals',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        allowNull: false 
    },
    caterer: {
        type: DataTypes.INTEGER,
        allowNull: false   
    }
})

// Meal.belongsTo(User, {
//     foreignKey: 'caterer'
// });

Meal.sync();

module.exports = { 
    Meal
}