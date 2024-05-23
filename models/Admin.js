const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    AuthCode: { type: String, required: true },
    Admin_fcmToken: { type: String, required: false },
    RegisteredUsers: [{
        UserId: mongoose.Schema.Types.ObjectId,
        RegistrationDate: Date
    }]
});

module.exports = mongoose.model('Admin', AdminSchema);
