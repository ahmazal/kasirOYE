-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 14, 2026 at 10:19 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_kasir`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id` int NOT NULL,
  `transaksi_id` int NOT NULL,
  `produk_id` int NOT NULL,
  `jumlah` int NOT NULL DEFAULT '1',
  `harga_satuan` decimal(15,2) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` int NOT NULL,
  `nama` varchar(100) NOT NULL,
  `deskripsi` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `nama`, `deskripsi`) VALUES
(1, 'Coffee', 'Minuman berbahan dasar kopi'),
(2, 'Non-Coffee', 'Minuman tanpa kopi'),
(3, 'Makanan Berat', 'Nasi, mie, dan hidangan utama'),
(4, 'Snack & Roti', 'Camilan, roti, dan kue');

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id` int NOT NULL,
  `nama` varchar(150) NOT NULL,
  `telepon` varchar(20) DEFAULT NULL,
  `alamat` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` int NOT NULL,
  `nama` varchar(200) NOT NULL,
  `kode_produk` varchar(50) NOT NULL,
  `kategori_id` int NOT NULL,
  `harga` decimal(15,2) NOT NULL DEFAULT '0.00',
  `stok` int NOT NULL DEFAULT '0',
  `satuan` varchar(30) NOT NULL DEFAULT 'porsi',
  `gambar` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id`, `nama`, `kode_produk`, `kategori_id`, `harga`, `stok`, `satuan`, `gambar`, `created_at`) VALUES
(1, 'Espresso', 'COF-001', 1, 18000.00, 100, 'gelas', 'uploads/espresso.jpg', '2026-06-11 02:04:07'),
(2, 'Americano', 'COF-002', 1, 20000.00, 100, 'gelas', 'uploads/americano.jpg', '2026-06-11 02:04:07'),
(3, 'Cappuccino', 'COF-003', 1, 25000.00, 100, 'gelas', 'uploads/cappuccino.jpg', '2026-06-11 02:04:07'),
(4, 'Latte', 'COF-004', 1, 27000.00, 100, 'gelas', 'uploads/latte.jpg', '2026-06-11 02:04:07'),
(5, 'Caramel Macchiato', 'COF-005', 1, 30000.00, 100, 'gelas', 'uploads/caramel_macchiato.jpg', '2026-06-11 02:04:07'),
(7, 'Matcha Latte', 'NCF-001', 2, 28000.00, 100, 'gelas', 'uploads/matcha_latte.jpg', '2026-06-11 02:04:07'),
(8, 'Chocolate', 'NCF-002', 2, 25000.00, 100, 'gelas', 'uploads/chocolate.jpg', '2026-06-11 02:04:07'),
(9, 'Taro Latte', 'NCF-003', 2, 28000.00, 100, 'gelas', 'uploads/taro_latte.jpg', '2026-06-11 02:04:07'),
(10, 'Lemon Tea', 'NCF-004', 2, 20000.00, 100, 'gelas', 'uploads/lemon_tea.jpg', '2026-06-11 02:04:07'),
(11, 'Nasi Goreng Spesial', 'MKN-001', 3, 35000.00, 50, 'porsi', 'uploads/nasi_goreng.jpg', '2026-06-11 02:04:07'),
(12, 'Mie Goreng Spesial', 'MKN-002', 3, 32000.00, 50, 'porsi', 'uploads/mie_goreng.jpg', '2026-06-11 02:04:07'),
(13, 'Nasi Ayam Geprek', 'MKN-003', 3, 38000.00, 50, 'porsi', 'uploads/ayam_geprek.jpg', '2026-06-11 02:04:07'),
(15, 'Croissant', 'SNK-001', 4, 22000.00, 40, 'pcs', 'uploads/croissant.jpg', '2026-06-11 02:04:07');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int NOT NULL,
  `no_transaksi` varchar(30) NOT NULL,
  `user_id` int NOT NULL,
  `pelanggan_id` int DEFAULT NULL,
  `total_harga` decimal(15,2) NOT NULL DEFAULT '0.00',
  `bayar` decimal(15,2) NOT NULL DEFAULT '0.00',
  `kembalian` decimal(15,2) NOT NULL DEFAULT '0.00',
  `metode_bayar` enum('tunai','transfer','qris','debit','kredit') NOT NULL DEFAULT 'tunai',
  `tanggal` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `nama` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','kasir') NOT NULL DEFAULT 'kasir',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Admin Utama', 'admin@kasir.com', '$2b$12$rqf/yF1rDBSKnHAnDANl3.P3QncJ9LmGR8OKTconj3EycQLfNEbUm', 'admin', '2026-06-11 02:04:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_detail_transaksi` (`transaksi_id`),
  ADD KEY `idx_detail_produk` (`produk_id`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_produk_kode` (`kode_produk`),
  ADD KEY `idx_produk_kategori` (`kategori_id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_no_transaksi` (`no_transaksi`),
  ADD KEY `idx_transaksi_user` (`user_id`),
  ADD KEY `idx_transaksi_tanggal` (`tanggal`),
  ADD KEY `fk_transaksi_pelanggan` (`pelanggan_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_users_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `fk_detail_produk` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detail_transaksi` FOREIGN KEY (`transaksi_id`) REFERENCES `transaksi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `produk`
--
ALTER TABLE `produk`
  ADD CONSTRAINT `fk_produk_kategori` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `fk_transaksi_pelanggan` FOREIGN KEY (`pelanggan_id`) REFERENCES `pelanggan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_transaksi_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
