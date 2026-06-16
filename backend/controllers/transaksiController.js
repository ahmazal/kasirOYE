const { pool } = require('../config/db');

// Generate nomor transaksi: TRX-YYYYMMDD-XXXX
async function generateNoTransaksi(conn) {
  const today = new Date();
  const tgl = today.toISOString().slice(0, 10).replace(/-/g, '');
  const [rows] = await conn.query(
    "SELECT COUNT(*) AS total FROM transaksi WHERE DATE(tanggal) = CURDATE()"
  );
  const urut = String(rows[0].total + 1).padStart(4, '0');
  return `TRX-${tgl}-${urut}`;
}

// GET /api/transaksi
async function getAll(req, res, next) {
  try {
    const [rows] = await pool.query(`
      SELECT t.*, u.nama AS nama_kasir, p.nama AS nama_pelanggan
      FROM transaksi t
      JOIN users u ON t.user_id = u.id
      LEFT JOIN pelanggan p ON t.pelanggan_id = p.id
      ORDER BY t.tanggal DESC
    `);
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

// GET /api/transaksi/:id - detail lengkap untuk print struk
async function getById(req, res, next) {
  try {
    const [trx] = await pool.query(`
      SELECT t.*, u.nama AS nama_kasir, p.nama AS nama_pelanggan, p.telepon AS telepon_pelanggan
      FROM transaksi t
      JOIN users u ON t.user_id = u.id
      LEFT JOIN pelanggan p ON t.pelanggan_id = p.id
      WHERE t.id = ?
    `, [req.params.id]);

    if (trx.length === 0) return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' });

    const [detail] = await pool.query(`
      SELECT dt.*, pr.nama AS nama_produk, pr.kode_produk, pr.satuan
      FROM detail_transaksi dt
      JOIN produk pr ON dt.produk_id = pr.id
      WHERE dt.transaksi_id = ?
    `, [req.params.id]);

    res.json({ success: true, data: { ...trx[0], items: detail } });
  } catch (err) { next(err); }
}

// POST /api/transaksi
async function create(req, res, next) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const { pelanggan_id, bayar, metode_bayar = 'tunai', items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Items transaksi tidak boleh kosong' });
    }

    // Hitung total & validasi stok
    let total_harga = 0;
    for (const item of items) {
      const [prod] = await conn.query('SELECT harga, stok FROM produk WHERE id = ?', [item.produk_id]);
      if (prod.length === 0) throw { status: 404, message: `Produk id ${item.produk_id} tidak ditemukan` };
      if (prod[0].stok < item.jumlah) throw { status: 400, message: `Stok produk id ${item.produk_id} tidak mencukupi` };
      item.harga_satuan = prod[0].harga;
      item.subtotal     = prod[0].harga * item.jumlah;
      total_harga      += item.subtotal;
    }

    if (bayar < total_harga) {
      return res.status(400).json({ success: false, message: 'Jumlah bayar kurang dari total harga' });
    }

    const kembalian     = bayar - total_harga;
    const no_transaksi  = await generateNoTransaksi(conn);

    const [trxResult] = await conn.query(
      'INSERT INTO transaksi (no_transaksi, user_id, pelanggan_id, total_harga, bayar, kembalian, metode_bayar) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [no_transaksi, req.user.id, pelanggan_id || null, total_harga, bayar, kembalian, metode_bayar]
    );

    const transaksi_id = trxResult.insertId;

    for (const item of items) {
      await conn.query(
        'INSERT INTO detail_transaksi (transaksi_id, produk_id, jumlah, harga_satuan, subtotal) VALUES (?, ?, ?, ?, ?)',
        [transaksi_id, item.produk_id, item.jumlah, item.harga_satuan, item.subtotal]
      );
      // Kurangi stok
      await conn.query('UPDATE produk SET stok = stok - ? WHERE id = ?', [item.jumlah, item.produk_id]);
    }

    await conn.commit();
    res.status(201).json({
      success : true,
      message : 'Transaksi berhasil',
      data    : { transaksi_id, no_transaksi, total_harga, bayar, kembalian },
    });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
}

// DELETE /api/transaksi/:id  (admin only)
async function remove(req, res, next) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [trx] = await conn.query('SELECT id FROM transaksi WHERE id = ?', [req.params.id]);
    if (trx.length === 0) return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' });

    // Kembalikan stok
    const [details] = await conn.query('SELECT produk_id, jumlah FROM detail_transaksi WHERE transaksi_id = ?', [req.params.id]);
    for (const d of details) {
      await conn.query('UPDATE produk SET stok = stok + ? WHERE id = ?', [d.jumlah, d.produk_id]);
    }

    // detail_transaksi terhapus otomatis (ON DELETE CASCADE)
    await conn.query('DELETE FROM transaksi WHERE id = ?', [req.params.id]);
    await conn.commit();
    res.json({ success: true, message: 'Transaksi berhasil dihapus dan stok dikembalikan' });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
}

module.exports = { getAll, getById, create, remove };
