const admin = require('firebase-admin');
require('dotenv').config(); // 환경 변수를 로드합니다.

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Buffer.from을 사용하여 private_key를 변환
serviceAccount.private_key = Buffer.from(serviceAccount.private_key, 'utf8').toString();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
