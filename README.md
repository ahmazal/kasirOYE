# Kasir App - OYE Coffee

A simple POS (Point of Sale) web application for a coffee shop. This repository contains a Node.js + Express backend and a static frontend (HTML/CSS/JS).

## Struktur proyek

- `backend/` - Express API server (MySQL)
- `frontend/` - Static frontend files (open `index.html` / `transaksi.html` in browser)
- `uploads/` - Static folder for uploaded images
- `db_kasir.sql` - SQL dump (tables and sample data)

---

## Persyaratan

- Node.js (v16+ recommended)
- MySQL server
- npm

---

## Setup backend

1. Salin file `.env.example` (jika ada) menjadi `.env` di folder `backend/` dan sesuaikan variabel berikut:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret
DB_NAME=kasir_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=8h
```

2. Install dependency dan jalankan server:

```bash
cd backend
npm install
npm run start
```

Server akan berjalan di `http://localhost:3000`.

---

## Setup database

1. Buat database MySQL baru, lalu import file `db_kasir.sql` dari folder `backend/`:

```sql
-- di MySQL client:
SOURCE db_kasir.sql;
```

2. Pastikan konfigurasi `.env` sesuai dengan kredensial MySQL Anda.

---

## Penggunaan frontend

Frontend adalah kumpulan file statis di folder `frontend/`. Untuk development cepat, buka file `frontend/index.html` di browser (atau gunakan static server seperti `Live Server` extension / `http-server`).

Pastikan token login tersimpan di `localStorage` setelah login agar request ke API dapat berhasil.

---

## Endpoint utama (ringkasan)

- `POST /api/auth/login` - Login
- `GET /api/kategori` - Ambil daftar kategori
- `GET /api/produk` - Ambil daftar produk
- `GET /api/pelanggan` - Ambil data pelanggan
- `GET /api/transaksi` - Ambil semua transaksi (autentikasi)
- `GET /api/transaksi/:id` - Detail transaksi
- `POST /api/transaksi` - Buat transaksi
- `DELETE /api/transaksi/:id` - Hapus transaksi (admin)
- `GET /api/users` - Ambil user (autentikasi)


---

## Catatan pengembangan

- Middleware `verifyToken` di `backend/middleware/auth.js` memeriksa header `Authorization: Bearer <token>`.
- Jika Anda berencana menghapus tabel `pelanggan`, periksa relasi di tabel `transaksi` dan `detail_transaksi` terlebih dahulu. Saat ini `transaksi` menyimpan `pelanggan_id` sebagai foreign key optional.

---

## Kontak

Jika butuh bantuan, buka issue atau hubungi pengembang.
