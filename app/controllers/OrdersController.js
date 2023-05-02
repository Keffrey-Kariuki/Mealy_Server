const {Order} = require("../models/order")
const {User} = require("../models/user")
const {Meal} = require("../models/meal")

class OrdersController {

    app = null
    constructor(app){
        this.app = app;
    }

    routes(){
        this.addOrder();
        this.showCustomerOrders();
    }

    // TODO: add order (uid, mealId, qty)
    addOrder(){
        this.app.post("/orders/create", async (req, res) => {

            try {

                const { uid, mealId, qty } = req.body
                const user = await User.findOne({where: { id: parseInt(uid) }});
                const meal = await Meal.findOne({where: { id: parseInt(mealId) }})

                // check if user does not exist
                if(!user){
                    return res.status(422).json({
                        "status": "failed",
                        "message": "That user does not exist"
                    })
                }

                // check if user does not exist
                if(!meal){
                    return res.status(422).json({
                        "status": "failed",
                        "message": "That meal does not exist"
                    })
                }

                // add order to db
                const order = await Order.create({
                    meal: parseInt(mealId),
                    customer: parseInt(uid),
                    qty: parseInt(qty),
                    totalCost: (parseInt(qty) * meal.price)
                });

                if(order){
                    return res.status(201).json({
                        "status": "success",
                        "message": "Your order has been received"
                    })
                }else{
                    return res.status(422).json({
                        "status": "failed",
                        "message": "Your order could NOT be created right now. Try again later"
                    })
                }

            } catch (error) {
                
                res.status(500).json({
                    "status": "failed",
                    "message": error.message
                })

            }

        });
    }

    // TODO: edit order

    // TODO: delete order

    // TODO: view all orders (customer)
    showCustomerOrders(){
        this.app.get("/orders/view/:uid", async (req, res) => {
            try {
                
                console.log("uid = ==== =", uid)
                const meals = await Order.findAll({
                    where: {
                      customer: parseInt(uid)  
                    }
                });

                res.status(200).json({
                    "status": "success",
                    "message": "User orders",
                    "data": meals
                })
                
            } catch (error) {
                res.status(500).json({
                    "status": "failed",
                    "message": error.message  
                })
            }
        });
    }

    // TODO: view all orders (caterer)

    // TODO: view all orders (general / both)

}

module.exports = OrdersController