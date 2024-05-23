const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    MedicationName: String,
    Taken: Boolean,
    TakenAt: Date
});

const CategorySchema = new mongoose.Schema({
    CategoryId: { type: mongoose.Schema.Types.ObjectId, unique: true },
    CategoryName: String,
    AlarmTime: String,  // HH:mm 형식
    Medications: [MedicationSchema]
});

const UserSchema = new mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, unique: true },
    UserName: String,
    User_fcmToken: String,
    AdminId: mongoose.Schema.Types.ObjectId,  // 등록된 관리자 ID
    Categories: [CategorySchema]
});

UserSchema.index({ UserId: 1 }); // 인덱스 생성 방식 확인

module.exports = mongoose.model('User', UserSchema);
