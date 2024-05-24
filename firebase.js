const admin = require('firebase-admin');
require('dotenv').config(); // 환경 변수를 로드합니다.

const serviceAccount = {
    "type": "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": "f09c448c55a27a686daaa7c3db992efffe416d0f", // 필요 시 환경 변수로 설정 가능
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": "101696773370806772891", // 필요 시 환경 변수로 설정 가능
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zntx5%40drug-a3da8.iam.gserviceaccount.com"
};

// Firebase Admin SDK 초기화
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
