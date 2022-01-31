const router = require('express').Router();
const getLoggedIn = require('../middleware/getLoggedIn')

router.get('/loggedIn', getLoggedIn);

module.exports = router;