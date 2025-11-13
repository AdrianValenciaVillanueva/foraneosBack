// importar el pool de conexiones
const pool = require('../db');
const bcrypt = require('bcryptjs');

// obtener la lista de usuarios (sin los hashes)
exports.list = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT id, username, name, email, created_at FROM users ORDER BY id');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// crear un usuario: usuario, nombre, correo y contraseña
exports.create = async (req, res, next) => {
  try {
    console.log(req.body);
    const { Usuario, Nombre, Correo, Contrasenia } = req.body;
    console.log(Usuario, Nombre, Correo, Contrasenia);
    if (!Usuario || !Nombre || !Correo || !Contrasenia) {
      return res.status(400).json({ error: 'usuario, nombre, correo y contrasenia son requeridos' });
    }

    // comprobar si email o username ya existen
    const [exists] = await pool.query('SELECT ID_Usuario FROM Usuarios WHERE Correo = ? OR Usuario = ? LIMIT 1', [Correo, Usuario]);
    if (exists.length) {
      return res.status(409).json({ error: 'email or username already in use' });
    }

    // hashear la contraseña
    const hash = await bcrypt.hash(Contrasenia, 10);

    // insertar usuario
    const [result] = await pool.query(
      'INSERT INTO usuarios (Usuario, Nombre, Correo, contrasenia) VALUES (?, ?, ?, ?)',
      [Usuario, Nombre, Correo, hash]
    );
    console.log(result);

    const insertId = result.insertId;
    console.log(insertId);
    const [rows] = await pool.query('SELECT ID_Usuario, Usuario, Nombre, Correo FROM Usuarios WHERE ID_Usuario = ?', [insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
};