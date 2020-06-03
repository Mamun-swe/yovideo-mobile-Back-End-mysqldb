const express = require('express')
const router = express.Router()
const AuthControllers = require('../controllers/auth/auth')

router.post('/register', AuthControllers.register)
router.get('/login', AuthControllers.login)


module.exports = router