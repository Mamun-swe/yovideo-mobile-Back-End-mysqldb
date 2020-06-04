const conn = require('../../../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Register User
const register = (req, res) => {

    const apiToken = jwt.sign({ email: req.body.email, role: 'user' }, 'SECRET', { expiresIn: '1d' })

    const errors = {
        name_err: "",
        email_err: "",
        password_err: ""
    }

    if (req.body.name == "") {
        errors.name_err = "Name is required"
    }

    if (req.body.email == "") {
        errors.email_err = "E-mail is required"
    } else if (req.body.email.indexOf('@gmail.com') < 0) {
        errors.email_err = "E-mail is not valid"
    }

    if (req.body.password == "") {
        errors.password_err = "Password is required"
    } else if (req.body.password.length < 8) {
        errors.password_err = "Minimum password length is 8 character"
    }

    if (errors.name_err || errors.email_err || errors.password_err) {
        res.status(500).json({
            errors
        })
    } else {

        conn.query("SELECT * FROM users WHERE email = ?", [req.body.email], (err, result) => {
            if (!err)
                if (result.length > 0)
                    res.status(200).json({
                        message: "exist"
                    })
                else
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            res.json({
                                error: err
                            })
                        }
                        const newData = {
                            name: req.body.name,
                            email: req.body.email,
                            role: 'user',
                            password: hash,
                            token: apiToken
                        }

                        conn.query('INSERT INTO users SET ?', newData, (err, result) => {
                            if (!err)
                                res.status(200).json({
                                    message: 'success',
                                    access_token: apiToken
                                })
                            else
                                res.send(err)
                        })
                    })

            else
                res.send(err)
        })

    }
}


// Login User
const login = (req, res) => {
    conn.query("SELECT * FROM users WHERE email = ?", req.body.email, (err, user) => {
        if (!err)
            if (user.length > 0)
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        res.send(err)
                    }

                    if (result) {
                        let apiToken = jwt.sign({ email: req.body.email, role: 'user' }, 'SECRET', { expiresIn: '1d' });
                        conn.query("UPDATE users SET token = ?", apiToken, (err, result) => {
                            if (!err)
                                res.status(200).json({
                                    message: 'success',
                                    access_token: apiToken
                                })
                            else
                                res.send(err)
                        })
                    } else {
                        res.status(404).json({
                            message: 'E-mail or Password incorrect'
                        })
                    }

                })
            else
                res.status(404).json({
                    message: 'E-mail or Password incorrect'
                })
        else
            res.send(err)
    })
}


// Logout User
const logout = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, 'SECRET')
    const email = decode.email

    conn.query("SELECT * FROM users WHERE email = ?", email, (err, user) => {
        if (!err)
            if (user.length > 0)
                conn.query("UPDATE users SET token = ? WHERE email = ?", [null, email], (err, result) => {
                    if (!err)
                        res.status(200).json({
                            message: 'success'
                        })
                    else
                        res.send(err)
                })
            else
                res.status(401).json({
                    message: 'Unauthorized token'
                })
        else
            res.send(err)
    })
}




module.exports = {
    register,
    login,
    logout
}