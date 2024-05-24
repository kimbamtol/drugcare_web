const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../firebase');  // 초기화된 Firebase Admin SDK 가져오기

exports.signup = async (req, res) => {
    const { email, password, authCode, Admin_fcmToken } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
        email,
        password: hashedPassword,
        AuthCode: authCode,
        Admin_fcmToken: Admin_fcmToken || "",  // 제공된 Admin_fcmToken을 사용하거나 기본값으로 빈 문자열
        RegisteredUsers: []
    });

    try {
        console.log('Before saving Admin:', newAdmin);
        await newAdmin.save();
        console.log('After saving Admin:', newAdmin);
        res.json({ message: 'Admin registered successfully' });
        console.log("계정 생성 성공");
    } catch (err) {
        res.status(400).json({ message: 'Error registering admin', error: err });
        console.log("계정 생성 실패", err);
    }
};

exports.login = async (req, res) => {
    const { email, password, fcmToken } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !await bcrypt.compare(password, admin.password)) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Admin_fcmToken 업데이트
    admin.Admin_fcmToken = fcmToken;

    try {
        console.log('Before saving Admin_fcmToken:', admin);
        await admin.save();
        console.log('After saving Admin_fcmToken:', admin);
        console.log('FCM Token:', fcmToken);
        res.json({ token });
    } catch (err) {
        console.error('Error updating FCM token:', err);
        res.status(500).json({ message: 'Error updating FCM token', error: err });
    }
};

exports.me = async (req, res) => {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
};

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
