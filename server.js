const express = require('express');
const bodyParser = require('body-parser');
const AuthController = require('./app/controllers/AuthController');
const MealController = require('./app/controllers/MealController');
const MenuController = require('./app/controllers/MenuController');

// set up express app
const app = express();
app.use(express.json());

// set up db associations
require('./config/associations');

// set up all controllers
new AuthController(app).routes();
new MealController(app).routes();
new MenuController(app).routes();


app.listen(8000, () => {
    console.log('Server is listening at port 8000');
});