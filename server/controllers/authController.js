const User = require('../models/User');
const Settings = require('../models/Settings');
const jwt = require('jsonwebtoken');

// Función para generar un token (no cambia)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Función de Registro (ya debería estar correcta)
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }
        
        const settings = await Settings.findOne({ settingName: 'mainSettings' });
        const initialSpins = settings ? settings.defaultSpins : 1;

        const user = await User.create({ name, email, password, spinsAvailable: initialSpins });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Datos de usuario inválidos.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor en el registro.' });
    }
};


// --- FUNCIÓN DE LOGIN (AQUÍ ESTÁ LA CLAVE) ---
// Vamos a asegurarnos de que la respuesta JSON sea exactamente la que el frontend necesita.
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        // Si el usuario existe Y la contraseña coincide...
        if (user && (await user.matchPassword(password))) {
            
            // ...respondemos con un objeto JSON que contiene TODOS los datos necesarios.
            res.json({
                _id: user._id,
                name: user.name,          // <-- El frontend necesita esto
                email: user.email,
                role: user.role,          // <-- El frontend necesita esto para el botón de admin
                spinsAvailable: user.spinsAvailable, // <-- Útil para el futuro
                token: generateToken(user._id)
            });

        } else {
            // Si no, respondemos con un error claro.
            res.status(401).json({ message: 'Email o contraseña inválidos.' });
        }
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error del servidor en el inicio de sesión.' });
    }
};