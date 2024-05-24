const admin = require('firebase-admin');
require('dotenv').config(); // 환경 변수를 로드합니다.

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Firebase Admin SDK 초기화
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
