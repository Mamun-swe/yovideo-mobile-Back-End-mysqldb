const express = require('express')
const router = express.Router()
const Permission = require('../controllers/middleware/permission')
const dashboardController = require('../controllers/admin/dashboard')


router.get('/users', Permission.adminRoleCheck, dashboardController.allUser)


module.exports = router