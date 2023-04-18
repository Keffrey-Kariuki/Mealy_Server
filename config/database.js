// import sequelize
const { Sequelize } = require('sequelize');

// create db connection
const dbConn = new Sequelize({
    dialect: 'sqlite',
    storage: '../db/meals.sqlite3',
});

// test connection
const testConn = async () => {
    await dbConn.authenticate();
    console.log("Database connected");
};

// export items
module.exports = {
    dbConn, testConn
}