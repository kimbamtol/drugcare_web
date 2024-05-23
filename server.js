const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // 환경 변수를 로드합니다.

// MongoDB 설정
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true // DeprecationWarning 해결
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Express 애플리케이션 설정
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', // 필요에 따라 Vercel 도메인 설정
    credentials: true
}));

// 기본 경로 라우트 설정
app.get('/', (req, res) => {
    res.send('Hello, welcome to the DrugCare server!');
});

// 라우트 설정
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// 서버 포트 설정
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
