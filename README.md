# Kasir App - OYE Coffee

Aplikasi kasir sederhana untuk usaha kopi. Proyek ini terdiri dari backend Node.js + Express dan frontend statis HTML/CSS/JS.

## Struktur Proyek

- `backend/` - API server Express dengan koneksi MySQL.
- `frontend/` - File statis frontend.
- `backend/uploads/` - Folder penyimpanan gambar yang diupload melalui backend.

## Persyaratan

- Node.js (versi 16 atau lebih baru)
- MySQL server
- npm

## Setup Backend

1. Buat file `.env` di dalam folder `backend/`.
2. Isi konfigurasi environment sesuai dengan database dan JWT Anda, contoh:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret
DB_NAME=kasir_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=8h
```

3. Install dependency dan jalankan server:

```bash
cd backend
npm install
npm run start
```

Server akan berjalan di `http://localhost:3000`.

## Setup Database

1. Buat database MySQL baru.
2. Import struktur tabel dan data awal sesuai kebutuhan aplikasi. Jika tidak ada file dump di repo, buat sendiri tabel `produk`, `kategori`, `transaksi`, `detail_transaksi`, `users`, dan tabel lain yang diperlukan.
3. Pastikan variabel database di `.env` sesuai dengan kredensial MySQL Anda.

## Penggunaan Frontend

Frontend adalah aplikasi statis di folder `frontend/`.

- Buka `frontend/index.html`, `frontend/transaksi.html`, atau halaman lain di browser.
- Atau gunakan server lokal seperti Live Server / `http-server` untuk membuka frontend.
- Pastikan login berhasil dan token tersimpan di `localStorage` agar API yang memerlukan otentikasi dapat diakses.

## Alur Upload Gambar Produk

- `backend/middleware/upload.js` mengatur `multer` untuk menyimpan file di `backend/uploads/`.
- `backend/routes/produk.js` memakai middleware `upload.single('gambar')` pada endpoint `POST /api/produk` dan `PUT /api/produk/:id`.
- `backend/controllers/produkController.js` menyimpan path gambar ke kolom `gambar` di database.
- Gambar tersedia melalui route statis `http://localhost:<PORT>/uploads/<nama_file>`.

## Endpoint Utama

- `POST /api/auth/login` - Login
- `GET /api/kategori` - Ambil semua kategori (autentikasi)
- `GET /api/kategori/:id` - Ambil kategori berdasarkan ID (autentikasi)
- `POST /api/kategori` - Tambah kategori (admin)
- `PUT /api/kategori/:id` - Ubah kategori (admin)
- `DELETE /api/kategori/:id` - Hapus kategori (admin)
- `GET /api/produk` - Ambil semua produk (autentikasi)
- `GET /api/produk/:id` - Ambil produk berdasarkan ID (autentikasi)
- `POST /api/produk` - Tambah produk dengan upload gambar (admin)
- `PUT /api/produk/:id` - Ubah produk dan gambar (admin)
- `DELETE /api/produk/:id` - Hapus produk (admin)
- `GET /api/transaksi` - Ambil semua transaksi (autentikasi)
- `GET /api/transaksi/:id` - Ambil detail transaksi (autentikasi)
- `POST /api/transaksi` - Buat transaksi (autentikasi)
- `DELETE /api/transaksi/:id` - Hapus transaksi (admin)

## Catatan Penting

- Folder `backend/uploads/` harus bisa ditulis oleh server.
- File gambar hanya didukung format JPG/JPEG, PNG, dan WEBP.
- Batas ukuran file upload ditetapkan 2MB.
- Path gambar disimpan di database dengan format relatif: `uploads/<nama_file>`.

## Cara Menjalankan

1. Jalankan backend dengan `npm run start` dari folder `backend/`.
2. Buka frontend di browser atau melalui static server.
3. Login, lalu gunakan fitur manajemen produk, kategori, dan transaksi.

## Kontak

Jika butuh bantuan atau perbaikan, langsung kontak developer atau buka issue pada repository.
