
const express = require('express');
const router = express.Router()

const homeController = require('../app/http/controller/homeController');
const authController = require('../app/http/controller/authController');
const cartController = require('../app/http/controller/customers/cartController');
const guestMiddleware  = require('../app/http/middleware/guest')
const orderController = require('../app/http/controller/customers/orderController')
const authMiddleaware = require('../app/http/middleware/authMiddleware')
const adminOrderController = require('../app/http/controller/admin/orderController')
const adminMiddleware = require('../app/http/middleware/adminMiddleware')


router.get('/', homeController.getHomePage);
router.get('/login',guestMiddleware.guest, authController.getLoginForm);
router.get('/register',guestMiddleware.guest,authController.getRegisterForm);
router.post('/login', authController.login);
router.post('/register',authController.postRegister);
router.post('/logout',authController.logout);

router.get('/cart',cartController.getCartPage );
router.post('/updateCart',cartController.updateCart)

//Customer routes
router.post('/orders',authMiddleaware.auth,orderController.store)
router.get('/customer/orders',authMiddleaware.auth,orderController.index)

// Admin routes 
router.get('/admin/orders',adminMiddleware.admin,adminOrderController.adminGetOrder)

module.exports = router;