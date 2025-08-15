const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Esto crea una referencia al modelo de Usuario
    },
    prize: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Prize' // Referencia al premio específico que se ganó
    },
    // Se guardan copias de los datos por si el premio original es eliminado del sistema.
    prizeName: {
        type: String,
        required: true
    },
    couponCode: {
        type: String,
        required: true
    }
}, { 
    timestamps: true // Esto añade automáticamente los campos createdAt y updatedAt
});

module.exports = mongoose.model('Winner', winnerSchema);