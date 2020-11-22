const express = require('express');
const routes = express.Router()

const menuController = require('./../app/http/controller/menuController')


routes
    .route('/menu')
    .post(menuController.createMenu)
    .get(menuController.getMenu)

module.exports = routes