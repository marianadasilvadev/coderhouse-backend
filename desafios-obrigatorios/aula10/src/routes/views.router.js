const express = require('express')

const viewsController = require('../controllers/views.controller')

const router = express.Router()

router.get('/', viewsController.getHome)

router.get('/realtimeproducts', viewsController.getRealTimeProducts)

module.exports = router
