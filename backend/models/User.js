

const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
