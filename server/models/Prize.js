const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    coupon: { type: String, required: true, unique: true },
    isPrize: { type: Boolean, default: true },

    // ===== CAMPO AÑADIDO =====
    // Un número más alto significa mayor probabilidad. Ej: 10, 20, 50.
    probability: { type: Number, default: 10, min: 1 }
});

module.exports = mongoose.model('Prize', prizeSchema);