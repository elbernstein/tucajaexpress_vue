const express = require('express');
const router = express.Router();
const { spinWheel } = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');

// Esta es la ruta que el frontend llamará para obtener un premio de forma segura
// Está protegida, por lo que solo usuarios logueados pueden acceder.
router.post('/spin', protect, spinWheel);

module.exports = router;