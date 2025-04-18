const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passportController = require('../controllers/passportController');

// register
router.get('/register', authController.getRegister);
router.post('/register', authController.addRegister);
// login
router.get('/login', authController.getLogin);
router.post('/login', authController.addLogin);

router.get('/confirm', authController.getConfirm);
// Google Auth Routes


router.get('/google',passportController.googleLogin());    
router.get('/google/callback',passportController.googleCallback);

router.get('/github', passportController.githubLogin());
router.get('/github/callback',passportController.githubCallback);

module.exports = router;
