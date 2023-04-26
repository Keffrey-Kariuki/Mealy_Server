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

    }

    // fetch all menus
    fetchMenus(){

    }

    // update a menu
    updateMenu(){

    }

    // delete a menu
    deleteMenu(){

    }

}