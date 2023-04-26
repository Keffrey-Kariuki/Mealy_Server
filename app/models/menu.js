// MENU
// ID, NAME, DESCRIPTION, MEALS(meal_ids), CATERER
const { dbConn } = require('../../config/database');
const { DataTypes } =  require('sequelize');

const Menu = dbConn.define('menus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type:DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    meals: {
        type: DataTypes.STRING,
        allowNull: false
    },
    caterer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isMealOfDay: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    timestamps: true
});

Menu.sync();

module.exports = {
    Menu
}