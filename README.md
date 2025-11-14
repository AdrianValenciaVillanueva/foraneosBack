# Foraneos Renta - API (Express.js)


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
npm install
```

Desarrollo

```powershell
npm run dev
```

Habilitar CORS para pruebas

Si vas a probar la API desde un frontend local (por ejemplo `http://localhost:3001`), ya incluimos `cors` en `app.js` con una configuración permisiva para desarrollo. Para restringir el origen en producción, sustituye `app.use(cors({ origin: true }))` por algo como:

```javascript
app.use(cors({ origin: 'https://mi-frontend.com' }));
```

Producción

```powershell
npm start
```

Rutas de ejemplo
- GET / -> mensaje de bienvenida
- GET /users -> lista de usuarios
 - POST /users { "username": "usuario1", "name": "Nombre", "email": "a@b.com", "password": "secret" } -> crea usuario


Siguientes pasos
- Añadir ESLint y tests
