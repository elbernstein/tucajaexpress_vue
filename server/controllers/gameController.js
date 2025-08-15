const User = require('../models/User');
const Prize = require('../models/Prize');
const Winner = require('../models/Winner');
const Settings = require('../models/Settings');
const SpinHistory = require('../models/SpinHistory');

exports.spinWheel = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const settings = await Settings.findOne({ settingName: 'mainSettings' });

        if (!settings || !settings.isRouletteActive) {
            return res.status(403).json({ message: 'La ruleta está desactivada en este momento.' });
        }
        if (!user) {
             return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        if (user.spinsAvailable <= 0) {
            return res.status(403).json({ message: 'No tienes giros disponibles.' });
        }

        const prizes = await Prize.find({});
        if (prizes.length === 0) {
            return res.status(500).json({ message: 'No hay premios configurados.' });
        }

        const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0);
        let randomPoint = Math.random() * totalProbability;
        let chosenPrize = null;
        for (const prize of prizes) {
            randomPoint -= prize.probability;
            if (randomPoint <= 0) { chosenPrize = prize; break; }
        }
        if (!chosenPrize) { chosenPrize = prizes[prizes.length - 1]; }

        user.spinsAvailable -= 1;
        user.lastSpinTimestamp = new Date();
        await user.save();
        
        await SpinHistory.create({ user: user._id, prizeWon: chosenPrize._id, wasPrize: chosenPrize.isPrize });
        
        if (chosenPrize.isPrize) {
            await Winner.create({ user: user._id, prize: chosenPrize._id, prizeName: chosenPrize.name, couponCode: chosenPrize.coupon });
        }
        
        res.json({ id: chosenPrize._id.toString(), name: chosenPrize.name, coupon: chosenPrize.coupon, isPrize: chosenPrize.isPrize });

    } catch (error) {
        console.error('Error en spinWheel Controller:', error);
        res.status(500).json({ message: 'Error en el servidor al procesar el giro.' });
    }
};