const admin = require('firebase-admin');
const serviceAccount = require('./fb.json');  // 서비스 계정 키 파일의 경로

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
