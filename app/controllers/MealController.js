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
        this.app.get('/meals/caterer_meals', async (req, res) => {
            const name = req.body.name;

            try {
                const caterer = await User.findOne({
                    where: {
                        name: name,
                        isCaterer: yes
                    }
                })

                const catererId = caterer.id
                
                const caterer_meals = await Meal.findAll({
                    where: {
                        caterer: catererId            
                    }
                })

                res.json({
                    "status": "successful",
                    "data": caterer_meals
                })
            } catch (error) {
                res.status(422).json({
                    "status": "failed",
                    "message": error.message
                })
            }

        })
    }

    // create a meal
    createMeal(){
        this.app.post('/meals/:uid', async (req, res) => {
            try{

                const uid = parseInt(req.params.uid);
                const { name, price, description } = req.body;

                // TODO: Check if user is caterer
                const caterer = await User.findOne({
                    where: {
                        id: uid,
                        isCaterer: yes
                    }
                })

                const meal = await Meal.create({
                    name: name,
                    price: price,
                    description: description,
                    caterer: caterer.id
                });

                res.json({
                    "status": "success",
                    "data": meal
                })

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
        this.app.put('/meals/update_meal/:uid', async (req, res) => {
            const uid = parseInt(req.params.uid);
            const { name, price, description } = req.body;

            try {
                
                await Meal.update({
                    name: name,
                    price: price,
                    description: description
                }, {
                    where: {
                        id: uid
                    }
                })

                res.json({
                    "status": "successful",
                    "message": "successfully updated meal"
                })

            } catch (error) {
                res.status(422).json({
                    "status": "failed",
                    "message": error.message
                })
            }

        })
    }

    //TODO: delete a meal
    deleteMeal(){
        this.app.delete("/meals/delete_meal/:id", async (req, res) => {
            const mealId = parseInt(req.params.id);
             
            try {
                await Meal.destroy({
                    where: {
                        id: mealId
                    }
                });

                res.json({
                    "status": "success",
                    "message": "meal deleted"
                })

            } catch (error) {
                res.status(422).json({
                    "status": "failed",
                    "message": error.message
                })
            }
            
        })
    }

}

module.exports = MealController;