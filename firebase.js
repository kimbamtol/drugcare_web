const admin = require('firebase-admin');
require('dotenv').config(); // 환경 변수를 로드합니다.

let serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// `\\n`을 `\n`으로 변환
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
