const { pool } = require('../config/db');

async function getAll(req, res, next) {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, k.nama AS nama_kategori
      FROM produk p
      JOIN kategori k ON p.kategori_id = k.id
      ORDER BY p.id ASC
    `);
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, k.nama AS nama_kategori
      FROM produk p
      JOIN kategori k ON p.kategori_id = k.id
      WHERE p.id = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    res.json({ success: true, data: rows[0] });
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const { nama, kode_produk, kategori_id, harga, stok, satuan } = req.body;
    if (!nama || !kode_produk || !kategori_id || harga == null) {
      return res.status(400).json({ success: false, message: 'Nama, kode_produk, kategori_id, dan harga wajib diisi' });
    }
    const [result] = await pool.query(
      'INSERT INTO produk (nama, kode_produk, kategori_id, harga, stok, satuan) VALUES (?, ?, ?, ?, ?, ?)',
      [nama, kode_produk, kategori_id, harga, stok || 0, satuan || 'pcs']
    );
    res.status(201).json({ success: true, message: 'Produk berhasil ditambahkan', data: { id: result.insertId, ...req.body } });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ success: false, message: 'Kode produk sudah digunakan' });
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { nama, kode_produk, kategori_id, harga, stok, satuan } = req.body;
    if (!nama || !kode_produk || !kategori_id || harga == null) {
      return res.status(400).json({ success: false, message: 'Nama, kode_produk, kategori_id, dan harga wajib diisi' });
    }
    const [result] = await pool.query(
      'UPDATE produk SET nama=?, kode_produk=?, kategori_id=?, harga=?, stok=?, satuan=? WHERE id=?',
      [nama, kode_produk, kategori_id, harga, stok ?? 0, satuan || 'pcs', req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    res.json({ success: true, message: 'Produk berhasil diupdate' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ success: false, message: 'Kode produk sudah digunakan' });
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const [result] = await pool.query('DELETE FROM produk WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    res.json({ success: true, message: 'Produk berhasil dihapus' });
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, create, update, remove };
