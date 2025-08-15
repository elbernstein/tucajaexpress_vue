const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    settingName: { type: String, default: 'mainSettings', unique: true },
    isRouletteActive: { type: Boolean, default: true },
    
    // ===== CAMPO AÑADIDO =====
    defaultSpins: { type: Number, default: 1, min: 0 }
});

module.exports = mongoose.model('Settings', settingsSchema);