const { pool } = require('../config/db');

async function getAll(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM pelanggan ORDER BY nama ASC');
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM pelanggan WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Pelanggan tidak ditemukan' });
    res.json({ success: true, data: rows[0] });
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const { nama, telepon, alamat } = req.body;
    if (!nama) return res.status(400).json({ success: false, message: 'Nama wajib diisi' });
    const [result] = await pool.query(
      'INSERT INTO pelanggan (nama, telepon, alamat) VALUES (?, ?, ?)',
      [nama, telepon || null, alamat || null]
    );
    res.status(201).json({ success: true, message: 'Pelanggan berhasil ditambahkan', data: { id: result.insertId, nama, telepon, alamat } });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const { nama, telepon, alamat } = req.body;
    if (!nama) return res.status(400).json({ success: false, message: 'Nama wajib diisi' });
    const [result] = await pool.query(
      'UPDATE pelanggan SET nama=?, telepon=?, alamat=? WHERE id=?',
      [nama, telepon || null, alamat || null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Pelanggan tidak ditemukan' });
    res.json({ success: true, message: 'Pelanggan berhasil diupdate' });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const [result] = await pool.query('DELETE FROM pelanggan WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Pelanggan tidak ditemukan' });
    res.json({ success: true, message: 'Pelanggan berhasil dihapus' });
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, create, update, remove };
