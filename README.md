# Foraneos Renta - API (Express.js)


Estructura:

- `app.js` - instancia de Express (exporta `app`).
- `server.js` - arranca el servidor.
- `routes/` - rutas (index, users).
- `controllers/` - controladores.
- `middlewares/` - logger y manejador de errores.
- `public/` - archivos estáticos.

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
- POST /users { "name": "Carlos" } -> crea usuario

Siguientes pasos
- Añadir validación y persistencia (DB)
- Añadir ESLint y tests
