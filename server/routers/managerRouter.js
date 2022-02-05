const router = require('express').Router();
const {
    CreateResponsable,
    LogOut,
    Login,
    getResponsable,
    deletResp,
    updateResponsable,

} = require('../controllers/managerControllers')
const auth = require('../middleware/authChauffeur')

router.post('/login', Login);
router.get('/logout', LogOut);
router.get('/getResponsables', getResponsable);
router.post('/createResponsable', CreateResponsable);
router.delete('/deleteResp/:id', deletResp);
router.put('/updateResponsable/:id', updateResponsable);





module.exports = router;