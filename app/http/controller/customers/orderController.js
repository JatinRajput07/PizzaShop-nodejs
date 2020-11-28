const Order = require('../../../models/orderModel')
const moment = require('moment')

exports.store= (req, res) => {
    const {phone ,address } = req.body

    if(!phone || !address){
        req.flash('error','All Fields are required')
        return res.redirect('/cart')
    }

    const order = new Order({
        customerId: req.user._id,
        items:req.session.cart.items,
        phone,
        address
    })

    order.save().then(result =>{
        req.flash('success','Order placed successfully')
        delete req.session.cart
        return res.redirect('/customer/orders')
    }).catch(err =>{
        req.flash('error','Something went wrong')
        return res.redirect('/cart')
    })
}

exports.index = async(req, res) => {
    const orders = await Order.find({customerId:req.user._id},null,{sort:{createdAt:-1}});
    res.header('cache-Control','no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0')
    res.status(200).render('customers/orders',{
        orders:orders,
        moment: moment,
    })
}