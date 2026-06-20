const { pool } = require('../config/db');
const path     = require('path');
const fs       = require('fs');

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
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    res.json({ success: true, data: rows[0] });
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const { nama, kode_produk, kategori_id, harga, stok, satuan } = req.body;

    if (!nama || !kode_produk || !kategori_id || harga == null)
      return res.status(400).json({ success: false, message: 'Nama, kode_produk, kategori_id, dan harga wajib diisi' });

    const gambar = req.file ? `uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      'INSERT INTO produk (nama, kode_produk, kategori_id, harga, stok, satuan, gambar) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nama, kode_produk, kategori_id, harga, stok || 0, satuan || 'porsi', gambar]
    );

    res.status(201).json({
      success : true,
      message : 'Produk berhasil ditambahkan',
      data    : { id: result.insertId, nama, kode_produk, kategori_id, harga, stok, satuan, gambar },
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ success: false, message: 'Kode produk sudah digunakan' });
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { nama, kode_produk, kategori_id, harga, stok, satuan } = req.body;

    if (!nama || !kode_produk || !kategori_id || harga == null)
      return res.status(400).json({ success: false, message: 'Nama, kode_produk, kategori_id, dan harga wajib diisi' });

    // Ambil gambar lama jika ada file baru
    let gambarBaru = null;
    if (req.file) {
      gambarBaru = `uploads/${req.file.filename}`;

      // Hapus gambar lama dari disk
      const [old] = await pool.query('SELECT gambar FROM produk WHERE id = ?', [req.params.id]);
      if (old.length > 0 && old[0].gambar) {
        const oldPath = path.join(__dirname, '..', old[0].gambar);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const query = gambarBaru
      ? 'UPDATE produk SET nama=?, kode_produk=?, kategori_id=?, harga=?, stok=?, satuan=?, gambar=? WHERE id=?'
      : 'UPDATE produk SET nama=?, kode_produk=?, kategori_id=?, harga=?, stok=?, satuan=? WHERE id=?';

    const params = gambarBaru
      ? [nama, kode_produk, kategori_id, harga, stok ?? 0, satuan || 'porsi', gambarBaru, req.params.id]
      : [nama, kode_produk, kategori_id, harga, stok ?? 0, satuan || 'porsi', req.params.id];

    const [result] = await pool.query(query, params);
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });

    res.json({ success: true, message: 'Produk berhasil diupdate' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ success: false, message: 'Kode produk sudah digunakan' });
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    // Hapus file gambar dari disk
    const [rows] = await pool.query('SELECT gambar FROM produk WHERE id = ?', [req.params.id]);
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });

    if (rows[0].gambar) {
      const filePath = path.join(__dirname, '..', rows[0].gambar);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await pool.query('DELETE FROM produk WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Produk berhasil dihapus' });
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, create, update, remove };
