const oreder = require('../../../models/orderModel')

exports.adminGetOrder = (req, res)=> {
    oreder.find({status:{$ne:'completed'}},null,{sort:{'createdAt':-1}})
    .populate('customerId','-password').exec((err,orders)=>{
        if(req.xhr){
           return res.json(orders)
        }else{
           return res.render('admin/order')
        }   
    })
}   