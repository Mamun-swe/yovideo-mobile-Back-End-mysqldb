const conn = require('../../../config')

const allUser = (req, res) => {
    conn.query("SELECT * FROM users", (err, result) => {
        if(!err)
            res.status(200).json({
                result
            })
        res.status(500).json({
            err
        })
    })
}

module.exports = {
    allUser
}
