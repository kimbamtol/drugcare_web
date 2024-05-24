const admin = require('firebase-admin');
require('dotenv').config(); // 환경 변수를 로드

// base64로 인코딩된 서비스 계정 키 디코딩
const serviceAccountBuffer = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64');
const serviceAccount = JSON.parse(serviceAccountBuffer.toString('utf-8'));

// `\\n`을 `\n`으로 변환
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
