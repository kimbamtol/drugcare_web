const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kimbamtol0304:whiteyi34!@cluster0.cejhgke.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;
