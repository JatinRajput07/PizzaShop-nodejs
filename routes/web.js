
const express = require('express');
const router = express.Router()

const homeController = require('../app/http/controller/homeController');
const authController = require('../app/http/controller/authController');
const cartController = require('../app/http/controller/customers/cartController');
const guestMiddleware  = require('../app/http/middleware/guest')


router.get('/', homeController.getHomePage);
router.get('/login',guestMiddleware.guest, authController.getLoginForm);
router.get('/register',guestMiddleware.guest,authController.getRegisterForm);
router.post('/login', authController.login);
router.post('/register',authController.postRegister);
router.post('/logout',authController.logout);

router.get('/cart',cartController.getCartPage );
router.post('/updateCart',cartController.updateCart)

module.exports = router;