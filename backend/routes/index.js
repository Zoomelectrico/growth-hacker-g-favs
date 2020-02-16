const { Router } = require('express');
const authController = require('../controllers/authController');
const sourceController = require('../controllers/sourceController');

const router = Router();

router.get('/sources', sourceController.getSources);

router.post('/sign-up', authController.createUser);
router.post('/sign-in', authController.signIn);
router.post('/sign-out', authController.signOut);

module.exports = router;
