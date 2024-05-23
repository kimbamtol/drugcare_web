const admin = require('firebase-admin');
const path = require('path');

// 서비스 계정 키 파일 경로 설정
const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://console.firebase.google.com/u/0/project/drug-a3da8/database/drug-a3da8-default-rtdb/data/~2F?hl=ko.firebaseio.com'
});

module.exports = admin;
