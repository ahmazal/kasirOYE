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

module.exports = { login };
