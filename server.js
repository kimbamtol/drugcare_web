const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const notificationRoutes = require('./routes/notification');

// MongoDB 설정
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello, welcome to the DrugCare server!');
});

// 라우트 설정
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/notification', notificationRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
