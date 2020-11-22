
const express = require('express');
const router = express.Router()

const homeController = require('../app/http/controller/homeController');
const authController = require('../app/http/controller/authController');
const cartController = require('../app/http/controller/customers/cartController');


router.get('/', homeController.getHomePage);
router.get('/login', authController.getLoginForm);
router.get('/register',authController.getRegisterForm);

router.get('/cart',cartController.getCartPage );
router.post('/updateCart',cartController.updateCart)

module.exports = router;