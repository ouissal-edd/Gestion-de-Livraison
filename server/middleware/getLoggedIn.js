const jwt = require('jsonwebtoken')

const getLoggedIn = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET)
            res.send(true)

        } else {
            return res.json(false)
        }
    } catch (err) {
        console.error(err)
        res.json(false)
    }

}
module.exports = getLoggedIn;