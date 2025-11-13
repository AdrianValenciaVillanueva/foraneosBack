# Foraneos Renta - API (Express.js)

Proyecto base en Express.js (JavaScript, sin TypeScript) con una estructura simple y funcional.

Estructura:

- `app.js` - instancia de Express (exporta `app`).
- `server.js` - arranca el servidor.
- `routes/` - rutas (index, users).
- `controllers/` - controladores.
- `middlewares/` - logger y manejador de errores.
- `public/` - archivos estáticos.

Estructura sugerida para claridad y escalabilidad:

- `routes/` — definición de rutas y mapeo a controladores (no contienen lógica de negocio).
- `controllers/` — reciben req/res y contienen la lógica de la aplicación (en este proyecto mantenemos la lógica aquí para simplicidad).
- `models/` — (opcional) definiciones de esquemas o modelos de DB.
- `middlewares/` — funciones reusables (logger, auth, validación, manejo de errores).

En este repositorio hemos decidido mantener la lógica simple en los `controllers/` por ahora; si en el futuro quieres separar lógica de negocio, puedes crear una capa `services/` y mover allí las reglas y la persistencia.

Requisitos
- Node.js 18+ (se recomienda Node 22+ para usar `node --watch`).

Instalación

```powershell
cd "C:\Users\villa\OneDrive\Escritorio\foraneosRenta"
npm install
```

Desarrollo

```powershell
npm run dev
```

Producción

```powershell
npm start
```

Rutas de ejemplo
- GET / -> mensaje de bienvenida
- GET /users -> lista de usuarios
 - POST /users { "username": "usuario1", "name": "Nombre", "email": "a@b.com", "password": "secret" } -> crea usuario

Base de datos / migración

Ejecuta la migración para crear la tabla `users` en tu base MySQL/MariaDB (puedes usar HeidiSQL). El archivo de migración está en `migrations/create_users.sql`.

Ejemplo SQL (ya incluido en `migrations/create_users.sql`):

```sql
CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Siguientes pasos
- Añadir validación y persistencia (DB)
- Añadir ESLint y tests
