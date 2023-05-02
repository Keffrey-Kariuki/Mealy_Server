const {Menu} =  require('../models/menu');
const {Meal} = require('../models/meal');
const {User} = require('../models/user');

class MenuController {

    app = null;
    constructor(){
        this.app = app;
    }

    routes(){
        this.createMenu();
        this.fetchMenus();
        this.updateMenu();
        this.deleteMenu();
    }

    // create a menu
    createMenu(){
        this.app.post("/create_menu/:uid", async (req, res) => {
            const uid = parseInt(req.params.uid)
            const { name, description, meals, isMealOfDay } = req.body;

            try {
                const caterer = await User.findOne({
                where: {
                    id: uid,
                    isCaterer: yes
                }
            })

            const caterer_id = caterer.id;

            await Menu.create({
                name: name,
                description: description,
                meals: meals,
                isMealOfDay: isMealOfDay
            })

            res.json({
                "status": "success",
                "message": "menu created"
            })
                
            } catch (error) {
                res.status(422).json({
                    "status": "failed",
                    "message": error.message
                })
                
            }
            

        })
    }

    // fetch all menus
    fetchMenus(){
        this.app.get("/fetch_menu", async (req, res) => {

            const menu_list = await Menu.findAll()

            res.json({
                "status": "successful",
                "data": menu_list
            })

        })
    }

    // update a menu
    updateMenu(){
        this.app.put("/update_menu", async (req, res) => {
            const { uid, name, description, meals, isMealOfDay } = req.body;
            const menu_id = parseInt(uid);

            try {
                await Menu.update({
                    name: name,
                    description: description,
                    meals: meals,
                    isMealOfDay: isMealOfDay
                }, {
                    where: {
                        id: menu_id
                    }
                })

                res.json({
                    "status": "success",
                    "message": "menu updated successfully"
                })
            } catch (error) {
                res.status(422).json({
                    "status": "failed",
                    "message": error.message
                })
            }

        })
    }

    // delete a menu
    deleteMenu(){
        this.app.delete("/delete_menu", async (req, res) => {
            const uid = req.body.uid;
            const menu_id = parseInt(uid);

            try {
                await Menu.destroy({
                    where: {
                        id: menu_id
                    }
                })

                res.json({
                    "status": "success",
                    "message": "menu deleted successfully"
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