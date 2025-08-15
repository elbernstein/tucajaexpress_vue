const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rutas (verifica si está logueado)
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtiene el token del header 'Bearer TOKEN'
            token = req.headers.authorization.split(' ')[1];

            // Verifica y decodifica el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Busca el usuario en la BBDD (sin la contraseña) y lo añade a la petición
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'No autorizado, token falló' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

// Middleware para verificar si es admin (debe usarse DESPUÉS de protect)
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado, no eres administrador' });
    }
};

module.exports = { protect, admin };