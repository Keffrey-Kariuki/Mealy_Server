const { Meal } = require('../app/models/meal');
const { User } = require('../app/models/user');

User.hasMany(Meal, {
    foreignKey: 'caterer'
});

Meal.belongsTo(User, {
    foreignKey: 'caterer'
});

Meal.sync();
User.sync();

module.exports = {}