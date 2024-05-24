// controllers/adminController.js
const admin = require('../firebase');  // 초기화된 Firebase Admin SDK 가져오기

exports.sendNotification = async (req, res) => {
    const { title, body, token } = req.body;

    const message = {
        notification: {
            title: title,
            body: body
        },
        token: token
    };

    try {
        const response = await admin.messaging().send(message);
        res.json({ message: 'Notification sent successfully', response });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Error sending notification', error });
    }
};
