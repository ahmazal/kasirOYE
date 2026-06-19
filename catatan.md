# Analisa Backend vs Frontend

## Ringkasan
Dokumen ini mencatat fitur backend yang sudah dibangun tetapi saat ini tidak digunakan oleh frontend.

## Fitur backend yang tersedia
Backend menyediakan endpoint untuk beberapa modul utama:

- `auth`
  - `POST /api/auth/login`
  - `POST /api/auth/register` (admin only)
  - `GET /api/auth/me`
- `kategori`
  - `GET /api/kategori`
  - `GET /api/kategori/:id`
  - `POST /api/kategori` (admin only)
  - `PUT /api/kategori/:id` (admin only)
  - `DELETE /api/kategori/:id` (admin only)
- `produk`
  - `GET /api/produk`
  - `GET /api/produk/:id`
  - `POST /api/produk` (admin only)
  - `PUT /api/produk/:id` (admin only)
  - `DELETE /api/produk/:id` (admin only)
- `transaksi`
  - `GET /api/transaksi`
  - `GET /api/transaksi/:id`
  - `POST /api/transaksi`
  - `DELETE /api/transaksi/:id` (admin only)
- `users`
  - `GET /api/users` (admin only)
  - `GET /api/users/:id` (admin only)
  - `PUT /api/users/:id` (admin only)
  - `DELETE /api/users/:id` (admin only)
- `pelanggan`
  - `GET /api/pelanggan`
  - `GET /api/pelanggan/:id`
  - `POST /api/pelanggan`
  - `PUT /api/pelanggan/:id`
  - `DELETE /api/pelanggan/:id`

## Endpoint backend yang digunakan di frontend
Frontend saat ini memanggil endpoint berikut:

- `POST /api/auth/login`
- `GET /api/kategori` untuk mengisi daftar kategori di modal produk
- `GET /api/produk` untuk menampilkan daftar menu
- `POST /api/produk` untuk menambah produk baru
- `PUT /api/produk/:id` untuk mengubah produk
- `DELETE /api/produk/:id` untuk menghapus produk
- `GET /api/transaksi` untuk menampilkan riwayat transaksi
- `POST /api/transaksi` untuk menyimpan transaksi baru

## Fitur backend yang tidak digunakan di frontend
Berikut daftar fitur backend yang sudah tersedia tetapi belum terpakai oleh frontend:

### 1. Auth / user registration
- `POST /api/auth/register`
- `GET /api/auth/me`
- Tidak ada halaman frontend untuk mendaftarkan user baru atau memanggil data user saat ini melalui endpoint ini.

### 2. Kategori CRUD lengkap
- `GET /api/kategori/:id`
- `POST /api/kategori`
- `PUT /api/kategori/:id`
- `DELETE /api/kategori/:id`
- Frontend hanya menggunakan `GET /api/kategori` untuk daftar kategori pada form produk. Tidak ada UI untuk menambah, mengubah, atau menghapus kategori.

### 3. Produk detail by ID
- `GET /api/produk/:id`
- Endpoint tersedia di backend dan helper `getProdukById(id)` ada di `frontend/js/api.js`, namun tidak digunakan di frontend.

### 4. User management
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- Tidak ada halaman atau skrip frontend yang memanggil endpoint user admin ini.

### 5. Pelanggan CRUD
- Semua endpoint `pelanggan` ada di backend, namun tidak dipakai oleh frontend sama sekali.
- Frontend menggunakan nama pelanggan yang diterima di transaksi, tetapi tidak pernah mengambil atau mengelola data pelanggan dari API.

### 6. Transaksi detail dan hapus transaksi
- `GET /api/transaksi/:id`
- `DELETE /api/transaksi/:id`
- Frontend hanya menampilkan list transaksi dan membuat transaksi baru. Tidak ada UI untuk meminta detail transaksi individual atau menghapus transaksi.

## Fungsi helper frontend yang tidak dipakai
Pada `frontend/js/api.js`, helper berikut sudah dihapus karena tidak dipakai oleh frontend saat ini:

- `getProdukById(id)`
- `getPelanggan()`
- `createTransaksi(data)`
- `getUsers()`
- `getUserById(id)`
- `createUser(payload)`
- `updateUser(id, payload)`
- `removeUser(id)`

Fungsi `getKategori()` tetap dipertahankan karena digunakan untuk mengisi daftar kategori pada form produk.

## Apa yang dihapus
- semua helper API untuk manajemen `pelanggan`
- semua helper API untuk `users`
- helper API `auth/register`
- helper API `GET /api/produk/:id`
- helper API duplicate `createTransaksi` di `frontend/js/api.js`

## Rekomendasi
1. Jika ingin membersihkan lebih lanjut: hapus backend route dan controller yang tidak dipakai jika UI tidak akan ditambahkan lagi.
2. Jika ingin memperluas sistem: tambahkan halaman admin untuk kategori, user, dan pelanggan.
3. Untuk transaksi: tambahkan halaman detail atau kemampuan hapus transaksi agar endpoint backend penuh terpakai.
4. Untuk auth: tambahkan pendaftaran admin/user atau fitur profile yang memanfaatkan `auth/me`.

## Dampak jika tabel `pelanggan` dihapus
Jika tabel `pelanggan` dihapus, backend akan error di bagian berikut:

- `backend/controllers/transaksiController.js`
  - Query `SELECT t.*, u.nama AS nama_kasir, p.nama AS nama_pelanggan` yang menggunakan `LEFT JOIN pelanggan p`.
  - Query `SELECT t.*, u.nama AS nama_kasir, p.nama AS nama_pelanggan, p.telepon AS telepon_pelanggan` yang juga menggunakan `LEFT JOIN pelanggan p`.
  - Insert ke `transaksi` masih menyimpan `pelanggan_id`, tetapi tanpa tabel `pelanggan` relasi akan rusak.

Catatan: route `backend/routes/pelanggan.js` sudah dihapus, namun referensi ke tabel `pelanggan` tetap ada di logika transaksi. Jika ingin menghapus tabel ini, sesuaikan juga query `transaksiController` dan skema `transaksi` agar tidak lagi mengandalkan kolom `pelanggan_id` atau field `nama_pelanggan`/`telepon_pelanggan`.
