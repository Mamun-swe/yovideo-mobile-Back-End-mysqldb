const conn = require('../../../config')

// Register User
const register = (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        type: req.body.type,
        password: req.body.password
    }

    const errors = {
        name_err: "",
        email_err: "",
        type_err: "",
        password_err: ""
    }

    if (data.name == "") {
        errors.name_err = "Name is required"
    }

    if (data.email == "") {
        errors.email_err = "E-mail is required"
    } else if (data.email.indexOf('@gmail.com') < 0) {
        errors.email_err = "E-mail is not valid"
    }

    if (data.type == "") {
        errors.type_err = "Type is required"
    }

    if (data.password == "") {
        errors.password_err = "Password is required"
    } else if (data.password.length < 8) {
        errors.password_err = "Minimum password length is 8 character"
    }

    if (errors.name_err || errors.email_err || errors.type_err || errors.password_err) {
        res.status(500).json({
            errors
        })
    } else {

        conn.query("SELECT * FROM users WHERE email = ?", [data.email], (err, result) => {
            if (!err)
                if (result.length > 0)
                    res.status(200).json({
                        message: "exist"
                    })
                else
                    conn.query('INSERT INTO users SET ?', data, (err, result) => {
                        if (!err)
                            res.status(200).json({
                                message: 'success'
                            })
                        else
                            res.send(err)
                    })
            else
                res.send(err)
        })

    }
}


// Login User
const login = (req, res) => {
    res.send({
        message: "I am login controller"
    })
}



module.exports = {
    register,
    login
}