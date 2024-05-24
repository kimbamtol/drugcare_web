const admin = require('firebase-admin');
require('dotenv').config(); // 환경 변수를 로드합니다.

// 환경 변수에서 서비스 계정 JSON을 파싱
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// private_key의 줄바꿈 문자를 변환
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

// Firebase Admin SDK 초기화
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
