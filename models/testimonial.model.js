const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    author: { type: String, require: true },
    text: { type: String, require: true }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);