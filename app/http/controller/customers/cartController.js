exports.getCartPage = (req, res) => {
    res.status(200).render('customers/cart',{ 
        title: 'Cart'
    })
}

exports.updateCart = (req, res)=>{

    // console.log(req.session)

    if(!req.session.cart){ 
        req.session.cart = {
            items:{},
            totalQty: 0,
            totalPrice: 0
        }
    }

    let cart = req.session.cart

    if(!cart.items[req.body._id]){
        cart.items[req.body._id] = { item : req.body, Qty: 1 }  
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    } else{
        cart.items[req.body._id].  Qty = cart.items[req.body._id].Qty + 1
        cart.totalQty = cart.totalQty + 1 
        cart.totalPrice = cart.totalPrice + req.body.price
    }
    res.status(200).json({totalQty: req.session.cart.totalQty}) 
}  