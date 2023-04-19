const express = require('express');
const bodyParser = require('body-parser');
const AuthController = require('./app/controllers/AuthController');

// set up express app
const app = express();
app.use(express.json());

// set up all controllers
new AuthController(app).routes();

app.listen(8000, () => {
    console.log('Server is listening at port 8000');
});