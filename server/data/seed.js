const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User'); // Importa el modelo de usuario

// --- IMPORTANTE: CONFIGURACIÓN ---
// Carga las variables de entorno desde el archivo .env que está en el directorio padre (/server)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// ===============================================================
//         CONFIGURACIÓN DEL ADMINISTRADOR POR DEFECTO
//       (Modifica estos valores con la información real)
// ===============================================================
const ADMIN_EMAIL = 'admin@tucajaexpress.com';
const ADMIN_PASSWORD = '12345678';
const ADMIN_NAME = 'Admin';
// ===============================================================


/**
 * Función asíncrona para conectarse a la base de datos.
 * Termina el proceso si la conexión falla.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('\x1b[32m%s\x1b[0m', 'MongoDB Conectado para Seeding...'); // Texto en verde
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', `Error en la conexión DB (Seed): ${err.message}`); // Texto en rojo
        process.exit(1);
    }
};

/**
 * Función para importar el usuario administrador si no existe.
 */
const importData = async () => {
    try {
        await connectDB();

        // 1. Busca si ya existe un usuario con ese email
        const adminUserExists = await User.findOne({ email: ADMIN_EMAIL });

        if (adminUserExists) {
            console.log('\x1b[33m%s\x1b[0m', 'El usuario administrador ya existe. No se ha realizado ninguna acción.'); // Texto amarillo
            process.exit();
        }

        // 2. Si no existe, lo crea usando los valores definidos arriba
        const adminUser = new User({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            role: 'admin',
            // Opcional: darle giros infinitos o un número alto al admin
            spinsAvailable: 999
        });

        // La encriptación de la contraseña se hace automáticamente gracias al pre-save hook en el modelo User.js
        await adminUser.save();
        
        console.log('\x1b[32m%s\x1b[0m', '¡Usuario administrador creado con éxito!');
        console.log(`  -> Email: ${ADMIN_EMAIL}`);
        console.log(`  -> Contraseña: (la que has configurado en este script)`);
        
        process.exit();
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `Error al importar datos: ${error}`);
        process.exit(1);
    }
};

/**
 * Función (opcional) para eliminar al usuario administrador.
 * Muy útil durante el desarrollo para limpiar y probar de nuevo.
 */
const destroyData = async () => {
     try {
        await connectDB();
        await User.deleteOne({ email: ADMIN_EMAIL });
        console.log('\x1b[31m%s\x1b[0m', 'Usuario administrador eliminado de la base de datos.');
        process.exit();
    } catch (error) {
        console.error(`Error al destruir datos: ${error}`);
        process.exit(1);
    }
}

// Lógica que decide qué función ejecutar basándose en los argumentos del comando
// 'npm run seed' -> ejecuta importData()
// 'npm run seed:destroy' -> ejecuta destroyData() porque `npm run` pasa el argumento '-d' que definimos en package.json
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}