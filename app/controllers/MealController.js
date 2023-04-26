const { Meal } = require('../models/meal');
const { User } = require('../models/user');

class MealController {

    app = null;

    constructor(app){
        this.app = app;
    }

    routes(){
        this.fetchMeals();
        this.fetchCatererMeals();
        this.createMeal();
        this.updateMeal();
        this.deleteMeal();
    }

    // list all meals
    fetchMeals(){
        this.app.get('/meals', async (req, res) => {
            try{
                const meals = await Meal.findAll();
                res.json({
                    "status": "success",
                    "data": meals
                })
            }catch(error){
                res.status(500).json({
                    "status": "failed",
                    "message": error.message
                })
            }
        });
    }

    // TODO: fetch a meal from a specific caterer
    fetchCatererMeals(){

    }

    // create a meal
    createMeal(){
        this.app.post('/meals/:uid', async (req, res) => {
            try{

                const uid = parseInt(req.params.uid);
                const { name, price, description } = req.body;

                const caterer = await User.findByPk(uid);

                // TODO: Check if user is caterer

                if(caterer){
                    const meal = await Meal.create({
                        name: name,
                        price: price,
                        description: description,
                        caterer: uid
                    });
                    res.json({
                        "status": "success",
                        "data": meal
                    })
                }else{
                    res.status(404).json({
                        "status": "failed",
                        "message": "You do not seem to be a caterer"
                    })
                }
            }catch(error){
                res.status(500).json({
                    "status": "failed",
                    "message": error.message
                })
            }
        })
    }

    //TODO: update a meal
    updateMeal(){

    }

    //TODO: delete a meal
    deleteMeal(){
        
    }

}

module.exports = MealController;