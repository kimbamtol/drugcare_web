const admin = require('firebase-admin');

// 환경 변수에서 서비스 계정 JSON을 파싱
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Firebase Admin SDK 초기화
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
