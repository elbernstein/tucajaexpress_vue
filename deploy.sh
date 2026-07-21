#!/bin/bash

# --- Mensaje de Inicio ---
echo "🚀 INICIANDO DEPLOY DEL FRONTEND - TuCajaExpress App"
echo "====================================================="

# --- Variables de Configuración ---
# Directorio raíz del proyecto clonado desde Git.
PROJECT_DIR="/var/www/html/tucajaex_new/tucajaexpress_vue"

# --- 1. Navegación y Actualización desde el Repositorio ---
echo ""
echo "📍 Navegando al directorio del proyecto: $PROJECT_DIR"
# Se detiene el script si el directorio no existe para evitar errores.
cd $PROJECT_DIR || { echo "❌ ERROR: El directorio del proyecto no existe. Abortando."; exit 1; }

echo "📥 Obteniendo los últimos cambios de GitHub..."
git fetch --all

echo "🔁 Forzando la actualización al último commit de la rama 'main'..."
# Descarta cualquier cambio local en el servidor y lo deja idéntico al repositorio.
git reset --hard origin/main

# --- 2. Preparación y Build del Frontend (Vue.js) ---
echo ""
echo "--- CONSTRUYENDO LA APLICACIÓN VUE ---"

echo "📦 Instalando/actualizando dependencias..."
npm install

echo "🔨 Generando la versión de producción en la carpeta /dist..."
npm run build

echo "🛠️ Creando/Verificando el archivo .htaccess para las rutas de Vue..."
# Escribe el contenido del .htaccess en la carpeta 'dist', que es la que sirve Apache.
# Esta configuración es esencial para que Vue Router funcione correctamente.
cat > dist/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
EOF
echo ".htaccess creado correctamente en la carpeta /dist."


# --- 3. Asignación de Permisos y Finalización ---
echo ""
echo "🔐 Asignando permisos correctos para el servidor web (Apache)..."
# Esto asegura que Apache (www-data) pueda leer los nuevos archivos construidos.
# Es importante ejecutarlo después del build.
sudo chown -R www-data:www-data $PROJECT_DIR
sudo chmod -R 755 $PROJECT_DIR

# Nota: El reinicio de Apache no es necesario para cambios en el código de Vue,
# solo para cambios en la configuración de Apache (.conf).

echo ""
echo "====================================================="
echo "✅ ¡DEPLOY COMPLETADO! El frontend ha sido actualizado."
