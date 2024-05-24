const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', adminController.login);
router.post('/signup', adminController.signup);
router.get('/me', authMiddleware, adminController.me);
router.post('/sendNotification', authMiddleware, adminController.sendNotification);

module.exports = router;
