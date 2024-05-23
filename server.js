const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB 설정
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/DrugCare', {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
    origin: 'https://drugcare-client.vercel.app/', // Vercel 도메인 설정,계속 바뀔수도 있으니 바뀔 때 마다 수정..
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
