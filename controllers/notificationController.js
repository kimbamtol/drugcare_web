const admin = require('../config/firebaseAdmin');

exports.sendNotification = async (req, res) => {
    const { token, title, body } = req.body;

    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: token,
    };

    try {
        const response = await admin.messaging().send(message);
        res.status(200).json({ success: true, response: response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
