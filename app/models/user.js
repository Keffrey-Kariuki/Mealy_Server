// USER
// ID, NAME, EMAIL, PASSWORD, IS_CATERER
const { dbConn } = require('../../config/database');
const { DataTypes } =  require('sequelize');
const { Meal } = require('./meal');

const User = dbConn.define('users', {
   id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
   },
   name: {
    type: DataTypes.STRING,
    allowNull: false
   },
   email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
   },
   passwordHash: {
    allowNull: false,
    type: DataTypes.STRING
   },
   isCaterer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
   }
}, {
    timestamps: true
});

// setup tables in DB
// User.hasMany(Meal, {
//     foreignKey: 'caterer'
// })

console.log("User data", typeof User)

User.sync();

module.exports = {
    User
};