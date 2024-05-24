const express = require('express');
const router = express.Router();
const { sendNotification } = require('../controllers/sendNotification');

// 인증 미들웨어
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === `Bearer ${process.env.SERVER_AUTH_TOKEN}`) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

router.post('/sendNotification', authenticate, sendNotification);

module.exports = router;
