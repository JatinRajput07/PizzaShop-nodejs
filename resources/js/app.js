import axios from 'axios'
import noty from 'noty'
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