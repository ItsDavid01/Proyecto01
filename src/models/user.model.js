const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    perms: { type: [String], default: ['deleteSelf', 'updateSelf']},
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

//createBook, updateBook, deleteBook
//updateUser, deleteUser
//deleteSelf, updateSelf

