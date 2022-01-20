const router = require('express').Router();
const { CreateResponsable,LogOut,Login} = require('../controllers/managerControllers')
const auth = require('../middleware/authChauffeur')

router.post('/login', Login);
router.get('/logout', LogOut);
router.post('/createResponsable',auth, CreateResponsable);





module.exports = router;