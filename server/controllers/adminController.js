const Prize = require('../models/Prize');
const Settings = require('../models/Settings');
const Winner = require('../models/Winner');
const User = require('../models/User');
const SpinHistory = require('../models/SpinHistory');

// --- Gestión de Premios (CRUD) ---
exports.getPrizes = async (req, res) => { try { const prizes = await Prize.find({}); res.json(prizes); } catch (e) { res.status(500).json({ message: 'Error del servidor' }); } };
exports.addPrize = async (req, res) => { const { name, coupon, isPrize, probability } = req.body; try { const prize = new Prize({ name, coupon, isPrize, probability }); const createdPrize = await prize.save(); res.status(201).json(createdPrize); } catch (e) { res.status(400).json({ message: 'No se pudo crear el premio.' }); } };
exports.updatePrize = async (req, res) => { const { name, coupon, isPrize, probability } = req.body; try { const prize = await Prize.findById(req.params.id); if (prize) { prize.name = name ?? prize.name; prize.coupon = coupon ?? prize.coupon; prize.isPrize = isPrize !== undefined ? isPrize : prize.isPrize; prize.probability = probability ?? prize.probability; const updatedPrize = await prize.save(); res.json(updatedPrize); } else { res.status(404).json({ message: 'Premio no encontrado.' }); } } catch (e) { res.status(400).json({ message: 'Error al actualizar el premio.' }); } };
exports.deletePrize = async (req, res) => { try { const prize = await Prize.findById(req.params.id); if (prize) { await prize.deleteOne(); res.json({ message: 'Premio eliminado.' }); } else { res.status(404).json({ message: 'Premio no encontrado.' }); } } catch (e) { res.status(500).json({ message: 'Error del servidor.' }); } };

// --- Gestión de Ajustes de la Ruleta ---
exports.getSettings = async (req, res) => { try { let settings = await Settings.findOne({ settingName: 'mainSettings' }); if (!settings) { settings = await new Settings().save(); } res.json(settings); } catch (e) { res.status(500).json({ message: 'Error del servidor.' }); } };
exports.updateSettings = async (req, res) => { const { isRouletteActive, defaultSpins } = req.body; try { const settings = await Settings.findOneAndUpdate( { settingName: 'mainSettings' }, { isRouletteActive, defaultSpins }, { new: true, upsert: true } ); res.json(settings); } catch (e) { res.status(400).json({ message: 'Error al actualizar los ajustes.' }); } };

// --- Gestión de Usuarios y Ganadores ---
exports.getWinners = async (req, res) => { try { const winners = await Winner.find({}).populate('user', 'name email').sort({ createdAt: -1 }); res.json(winners); } catch (e) { res.status(500).json({ message: 'Error del servidor.' }); } };
exports.getUsers = async (req, res) => { try { const users = await User.find({}).select('-password').sort({ createdAt: -1 }); res.json(users); } catch(err){ res.status(500).json({ message: 'Error del servidor.' }); } };
exports.addSpinsToUser = async (req, res) => { const { spinsToAdd } = req.body; try { const user = await User.findById(req.params.id); if(!user) return res.status(404).json({ message: 'Usuario no encontrado.' }); user.spinsAvailable += Number(spinsToAdd) || 0; await user.save(); res.json({ message: `Se añadieron ${spinsToAdd} giros a ${user.name}`}); } catch(err){ res.status(400).json({ message: 'Error al añadir giros.' }); } };

// --- Dashboard ---
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalSpins = await SpinHistory.countDocuments();
        let mostWonPrizes = [];
        const totalWinners = await Winner.countDocuments();
        if (totalWinners > 0) {
            mostWonPrizes = await Winner.aggregate([
                { $group: { _id: '$prizeName', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 }
            ]);
        }
        res.json({ totalUsers, totalSpins, mostWonPrizes });
    } catch(err) {
        console.error('Error al obtener estadísticas:', err);
        res.status(500).json({ message: 'Error del servidor.' });
    }
};