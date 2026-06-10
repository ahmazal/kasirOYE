const { pool } = require('../config/db');

async function getAll(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM kategori ORDER BY id ASC');
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM kategori WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
    res.json({ success: true, data: rows[0] });
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const { nama, deskripsi } = req.body;
    if (!nama) return res.status(400).json({ success: false, message: 'Nama wajib diisi' });
    const [result] = await pool.query('INSERT INTO kategori (nama, deskripsi) VALUES (?, ?)', [nama, deskripsi || null]);
    res.status(201).json({ success: true, message: 'Kategori berhasil ditambahkan', data: { id: result.insertId, nama, deskripsi } });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const { nama, deskripsi } = req.body;
    if (!nama) return res.status(400).json({ success: false, message: 'Nama wajib diisi' });
    const [result] = await pool.query('UPDATE kategori SET nama = ?, deskripsi = ? WHERE id = ?', [nama, deskripsi || null, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
    res.json({ success: true, message: 'Kategori berhasil diupdate' });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const [result] = await pool.query('DELETE FROM kategori WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
    res.json({ success: true, message: 'Kategori berhasil dihapus' });
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, create, update, remove };
