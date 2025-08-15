const mongoose = require('mongoose');

const spinHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    prizeWon: {
        // Hacemos que la referencia sea opcional, por si cae en "sigue intentando"
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prize',
        default: null
    },
    wasPrize: {
        // Guardamos si fue un premio o no, para estadísticas rápidas
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('SpinHistory', spinHistorySchema);