
const Menus = require('./../../models/menuModel');

exports.createMenu = async(req,res)=>{
try {
    const Menu = await Menus.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            menu:Menu 
        }
    });
    
}catch (error) {
    res.status(400).json({
        status:'fail',
        message:error
    })
}
};


exports.getMenu = async(req, res) => {
 const menu = await Menus.find();
 res.status(201).json({
    status:'success',
    result:menu.length,
    data:{
        menu:menu 
    }
});
}
