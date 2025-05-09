// src/models/reservation.model.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    reservedAt: { type: Date, default: Date.now },
    dueAt: { type: Date },
    returnedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Reservas', reservationSchema);