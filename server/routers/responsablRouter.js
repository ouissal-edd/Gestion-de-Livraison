const router = require('express').Router();
const {
    getLivraison,
    CreateLivraison,
    CreateChauffeur,
    LogOut,
    Login,
    deletChauffeur,
    getChauffeur
} = require('../controllers/responsablControllers')
const auth = require('../middleware/authResponsable')


router.post('/login', Login);
router.get('/logout', LogOut);
router.post('/createChauffeur', auth, CreateChauffeur);
router.post('/createLivraison', auth, CreateLivraison);
router.get('/getLivraison', auth, getLivraison);
router.delete('/deleteChauffeur/:id', auth, deletChauffeur);
router.get('/getChauffeurs', auth, getChauffeur);







module.exports = router;