const Menu  = require('./../../models/menuModel');

exports.getHomePage= async(req, res) => {
    const menu = await Menu.find();
    // console.log(menu)

    res.status(200).render('home',{
        title: 'Home Page',
        menu
    })
}   
