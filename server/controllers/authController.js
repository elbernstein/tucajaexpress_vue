const User = require('../models/User');
const Settings = require('../models/Settings');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }
        
        const settings = await Settings.findOne({ settingName: 'mainSettings' });
        const initialSpins = settings ? settings.defaultSpins : 1;

        const user = await User.create({ 
            name, email, password,
            spinsAvailable: initialSpins 
        });

        if (user) {
            res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
        } else {
            res.status(400).json({ message: 'Datos de usuario inválidos.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor.' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, spinsAvailable: user.spinsAvailable, token: generateToken(user._id) });
        } else {
            res.status(401).json({ message: 'Email o contraseña inválidos.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor.' });
    }
};