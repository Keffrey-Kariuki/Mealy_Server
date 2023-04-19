const bcrypt = require('bcrypt');
const { User } = require('../models/user');

// controller for authentication
class AuthController {
    
    // object variables
    app = null;
    saltRounds = 10;

    constructor(app){
        // reference express app provided
        this.app = app
    }


    // all routes will be rendered from here
    routes() {
        this.register();
        this.login();
    } 

    // sign up
    register(){
        this.app.post('/register', async (req, res) => {
            const { name, email, password, isCaterer } = req.body;
            // const name = req.body.name;
            // const email = req.body.email;
            // const password = req.body.password;
            // const isCaterer = req.body.isCaterer;

            // encrypt password
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);

            try {
                // insert into db
                await User.create({
                    name: name,
                    email: email,
                    passwordHash: hashedPassword,
                    isCaterer: isCaterer 
                });

                res.json({
                    "status": "success",
                    "message": "user has been created successfully"
                })
            } catch (error) {
                
                res.status(422).json({
                    "status": "failed",
                    "message": error.message
                })

            }
        });
    }

    login(){
        // TODO: Implement
    }

}

module.exports = AuthController;