import axios from 'axios'
import noty from 'noty'
import moment from 'moment'
import { initAdmin } from './admin'


const addCart = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cartCount');

const updateCart = (pizza)=>{
    axios.post('/updateCart',pizza).then(res => {
        console.log(res)
        cartCount.innerText = res.data.totalQty
        new noty({
            type:'success',
            timeout:1000,
            text:'Item added to cart'
        }).show()
    }).catch(err =>{
        new noty({
            type:'error',
            timeout:1000,
            text:'Something wrong'
        }).show()
    })
}

addCart.forEach((btn) => {
    btn.addEventListener('click',(el)=> {
        // console.log(el)
        const pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza)
        // console.log(pizza)
    })
})

const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(() => {
        alertMsg.remove()
    }, 2000);
};

initAdmin()


let statuses = document.querySelectorAll('.status_line')
let hidenInput = document.querySelector('#hidden-input')
let order = hidenInput ? hidenInput.value : null
order  = JSON.parse(order)
let time  = document.createElement('small')



 // change Order status
function updateStatus(order){
    statuses.forEach((status)=>{
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status)=>{
        let dataProp = status.dataset.status
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp === order.status){
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
        }   

    })

}
 
updateStatus(order)
// console.log(order)

// socket
let socket = io();
//join
if(order){
    socket.emit('join',`order_${order._id}`)
}   

const adminAreaPath = window.location.pathname;
if(adminAreaPath.includes('admin')){
    socket.emit('join','adminRoom')
}

socket.on('orderUpdated',(data)=>{
    const updatedOrder = {...order}
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new noty({
        type:'success',
        timeout:1000,
        text:'Order Updated'
    }).show()
    // console.log(data)
}) 