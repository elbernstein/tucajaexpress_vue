const express = require('express');
const router = express.Router();
const {
    // Importamos TODAS las funciones del controlador que creamos
    getPrizes, addPrize, updatePrize, deletePrize,
    getSettings, updateSettings, 
    getWinners,
    getUsers, addSpinsToUser,
    getDashboardStats
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// === Rutas de Premios ===
// Cualquiera puede ver los premios (para la ruleta)
router.get('/prizes', getPrizes); 

// Solo los admins pueden modificar los premios
router.post('/prizes', protect, admin, addPrize);
router.put('/prizes/:id', protect, admin, updatePrize);
router.delete('/prizes/:id', protect, admin, deletePrize);


// === Rutas de Ajustes ===
// Cualquiera puede ver los ajustes (para saber si la ruleta está activa)
router.get('/settings', getSettings);

// Solo admins pueden cambiar los ajustes
router.put('/settings', protect, admin, updateSettings);


// === Rutas de Historial de Ganadores ===
// Solo admins pueden ver la lista de ganadores
router.get('/winners', protect, admin, getWinners);


// === Rutas de Gestión de Usuarios ===
// Solo admins pueden ver la lista de usuarios y añadirles giros
router.get('/users', protect, admin, getUsers);
router.put('/users/:id/add-spins', protect, admin, addSpinsToUser);


// === RUTA FALTANTE DEL DASHBOARD ===
// Solo admins pueden ver las estadísticas
router.get('/stats', protect, admin, getDashboardStats);


module.exports = router;