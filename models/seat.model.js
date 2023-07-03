const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    day: { type: Number, require: true },
    seat: { type: Number, require: true },
    client: { type: String, require: true },
    email: { type: String, require: true }
});

module.exports = mongoose.model('Seat', seatSchema);