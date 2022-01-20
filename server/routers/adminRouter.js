const router = require('express').Router();
const { Login,LogOut,getManager,CreateManager,Register} = require('../controllers/adminControllers')
const auth = require('../middleware/authAdmin')

router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', LogOut);
router.post('/createManager',auth, CreateManager);
router.get('/getManagers',auth, getManager);





module.exports = router;