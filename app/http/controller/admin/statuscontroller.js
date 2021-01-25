const Order = require('../../../models/orderModel')


exports.update = async(req, res) => {
    Order.updateOne({_id:req.body.orderId},{status:req.body.status},(err,data)=>{
        if(err){
            return res.redirect('/admin/orders')
        }
        // emit event
        const eventEmitter = req.app.get('eventEmitter')
        eventEmitter.emit('orderUpdated',{id:req.body.orderId, status:req.body.status})
        return res.redirect('/admin/orders')        
    })
}   