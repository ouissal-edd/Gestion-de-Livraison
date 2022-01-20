const router = require('express').Router();
const {Prime , Login , LogOut,takeDelivery} = require('../controllers/chauffeurController')
const auth = require('../middleware/authChauffeur')

router.post('/login', Login);
router.get('/logout', LogOut);
router.post('/takeDelivery',auth, takeDelivery);
router.post('/calculePrime',auth,Prime);








module.exports = router;