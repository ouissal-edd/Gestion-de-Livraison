const router = require('express').Router();
const {
    Login,
    LogOut,
    getManager,
    CreateManager,
    Register,
    deletManager,
    updateManager
} = require('../controllers/adminControllers')
const auth = require('../middleware/authAdmin')


router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', LogOut);
router.post('/createManager', auth, CreateManager);
router.get('/getManagers', getManager);
router.delete('/deleteManager/:id', deletManager);
router.patch('/updateManager/:id', updateManager);






module.exports = router;