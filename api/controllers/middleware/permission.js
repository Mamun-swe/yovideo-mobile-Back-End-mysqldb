const jwt = require('jsonwebtoken')
const conn = require('../../../config')

const userLogout = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')
        const email = decode.email
        conn.query("SELECT * FROM users WHERE email = ? AND token = ?", [email, token], (err, user) => {
            if (!err)
                if (user.length > 0)
                    next()
                else
                    res.status(401).json({
                        message: 'unauthorized'
                    })
        })

    } catch (error) {
        res.status(401).json({
            message: 'unauthorized'
        })
    }
}

const userRoleCheck = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')
        const email = decode.email
        conn.query("SELECT * FROM users WHERE email = ? AND role = ? AND token = ?", [email, 'user', token], (err, user) => {
            if (!err)
                if (user.length > 0)
                    next()
                else
                    res.status(401).json({
                        message: 'unauthorized'
                    })
        })

    } catch (error) {
        res.status(401).json({
            message: 'unauthorized'
        })
    }
}

const adminRoleCheck = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')
        const email = decode.email
        conn.query("SELECT * FROM users WHERE email = ? AND role = ? AND token = ?", [email, 'user', token], (err, user) => {
            if (!err)
                if (user.length > 0)
                    next()
                else
                    res.status(401).json({
                        message: 'unauthorized'
                    })
        })

    } catch (error) {
        res.status(401).json({
            message: 'unauthorized'
        })
    }
}

module.exports = {
    userLogout,
    userRoleCheck,
    adminRoleCheck
}