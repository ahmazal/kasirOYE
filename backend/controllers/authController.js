const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const { pool } = require('../config/db');

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email dan password wajib diisi' });
    }

    const [rows] = await pool.query(
      'SELECT id, nama, email, password, role FROM users WHERE email = ?',
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }

    const user = rows[0];
    let valid = await bcrypt.compare(password, user.password);

    if (!valid && user.password === password) {
      valid = true;
      const hash = await bcrypt.hash(password, 12);
      await pool.query('UPDATE users SET password = ? WHERE id = ?', [hash, user.id]);
    }

    if (!valid) {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }

    const token = jwt.sign(
      { id: user.id, nama: user.nama, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({
      success : true,
      message : 'Login berhasil',
      token,
      user    : { id: user.id, nama: user.nama, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/register  (admin only)
async function register(req, res, next) {
  try {
    const { nama, email, password, role = 'kasir' } = req.body;
    if (!nama || !email || !password) {
      return res.status(400).json({ success: false, message: 'Nama, email, dan password wajib diisi' });
    }

    const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (exists.length > 0) {
      return res.status(409).json({ success: false, message: 'Email sudah terdaftar' });
    }

    const hash = await bcrypt.hash(password, 12);
    const [result] = await pool.query(
      'INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)',
      [nama, email, hash, role]
    );

    res.status(201).json({
      success : true,
      message : 'User berhasil ditambahkan',
      data    : { id: result.insertId, nama, email, role },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me
async function me(req, res) {
  res.json({ success: true, data: req.user });
}

module.exports = { login, register, me };
