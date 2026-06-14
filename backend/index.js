require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const path         = require('path');
const { testConnection } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app  = express();
const PORT = process.env.PORT || 3000;

//  Middleware global
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Static folder untuk gambar produk 
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//  Routes
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/kategori',   require('./routes/kategori'));
app.use('/api/produk',     require('./routes/produk'));
app.use('/api/pelanggan',  require('./routes/pelanggan'));
app.use('/api/transaksi',  require('./routes/transaksi'));
app.use('/api/users',      require('./routes/users'));

// Health check
app.get('/', (req, res) => res.json({ message: '☕ Kasir API berjalan', status: 'OK' }));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' }));

// Error handler (harus paling bawah)
app.use(errorHandler);

//  Start server
async function start() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log(`Gambar tersedia di http://localhost:${PORT}/uploads/<nama_file>`);
  });
}

start();
