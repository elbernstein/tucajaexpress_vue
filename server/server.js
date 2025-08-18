require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Estas líneas ahora recibirán routers válidos
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const gameRoutes = require('./routes/gameRoutes'); 

const app = express();


app.set('trust proxy', 1); // Confía en la primera cabecera de proxy (la de Apache)

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la Base de Datos
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.error('No se pudo conectar a MongoDB...', err));

// Rutas de la API (Estas líneas ya no fallarán)
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/game', gameRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));