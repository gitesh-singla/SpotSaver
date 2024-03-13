const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, match: /[a-zA-Z]/, required: true },
    email: { type: String, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, required: true, unique: true },
    phone: { type: String, match: /^\d+$/, required: true },
    password: { type: String, minLength: 8, required: true },
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;