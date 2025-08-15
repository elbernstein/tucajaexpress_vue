const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },

    // ===== CAMPOS AÑADIDOS =====
    spinsAvailable: { type: Number, default: 1 }, // Por defecto, 1 giro al registrarse
    lastSpinTimestamp: { type: Date } // Para futuras reglas (ej. 1 giro al día)

}, { timestamps: true });

// El resto del archivo no cambia
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);