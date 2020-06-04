const express = require('express')
const router = express.Router()
const AuthControllers = require('../controllers/auth/auth')
const Permission = require('../controllers/middleware/permission')

router.post('/register', AuthControllers.register)
router.post('/login', AuthControllers.login)
router.post('/logout', Permission.userLogout, AuthControllers.logout)


module.exports = router