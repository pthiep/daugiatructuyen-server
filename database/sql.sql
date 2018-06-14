-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.26-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for daugiatructuyen
CREATE DATABASE IF NOT EXISTS `daugiatructuyen` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `daugiatructuyen`;

-- Dumping structure for table daugiatructuyen.camdaugia
CREATE TABLE IF NOT EXISTS `camdaugia` (
  `ma` int(11) NOT NULL AUTO_INCREMENT,
  `manguoidung` int(11) DEFAULT NULL,
  `madaugia` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table daugiatructuyen.camdaugia: ~7 rows (approximately)
/*!40000 ALTER TABLE `camdaugia` DISABLE KEYS */;
INSERT IGNORE INTO `camdaugia` (`ma`, `manguoidung`, `madaugia`) VALUES
	(1, 5, 2),
	(2, 5, 2),
	(3, 5, 2),
	(4, 5, 2),
	(5, 5, 2),
	(6, 5, 2),
	(7, 3, 2);
/*!40000 ALTER TABLE `camdaugia` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.danhgianguoidung
CREATE TABLE IF NOT EXISTS `danhgianguoidung` (
  `madanhgia` int(11) NOT NULL AUTO_INCREMENT,
  `manguoidanhgia` int(11) DEFAULT NULL,
  `manguoiduocjdanhgia` int(11) DEFAULT NULL,
  `danhgia` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`madanhgia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table daugiatructuyen.danhgianguoidung: ~0 rows (approximately)
/*!40000 ALTER TABLE `danhgianguoidung` DISABLE KEYS */;
/*!40000 ALTER TABLE `danhgianguoidung` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.danhmuc
CREATE TABLE IF NOT EXISTS `danhmuc` (
  `madanhmuc` int(11) NOT NULL AUTO_INCREMENT,
  `tendanhmuc` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`madanhmuc`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.danhmuc: ~2 rows (approximately)
/*!40000 ALTER TABLE `danhmuc` DISABLE KEYS */;
INSERT IGNORE INTO `danhmuc` (`madanhmuc`, `tendanhmuc`) VALUES
	(1, 'Điện thoại'),
	(2, 'Máy tính');
/*!40000 ALTER TABLE `danhmuc` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.daugia
CREATE TABLE IF NOT EXISTS `daugia` (
  `madaugia` int(11) NOT NULL AUTO_INCREMENT,
  `masanpham` int(11) NOT NULL DEFAULT '0',
  `manguoiban` int(11) NOT NULL DEFAULT '0',
  `manguoidaugiacaonhat` int(11) NOT NULL DEFAULT '0',
  `giacaonhat` bigint(20) NOT NULL DEFAULT '0',
  `thoigiandang` datetime NOT NULL,
  `thoigianketthuc` datetime NOT NULL,
  `giahan` int(11) DEFAULT NULL,
  PRIMARY KEY (`madaugia`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.daugia: ~22 rows (approximately)
/*!40000 ALTER TABLE `daugia` DISABLE KEYS */;
INSERT IGNORE INTO `daugia` (`madaugia`, `masanpham`, `manguoiban`, `manguoidaugiacaonhat`, `giacaonhat`, `thoigiandang`, `thoigianketthuc`, `giahan`) VALUES
	(1, 1, 2, 3, 3100000, '2018-06-07 23:14:45', '2018-06-14 03:02:50', NULL),
	(2, 2, 3, 3, 200000, '2018-06-08 16:22:26', '2018-06-13 16:30:00', NULL),
	(3, 3, 4, 5, 700000, '2018-06-11 17:27:24', '2018-06-15 17:27:25', NULL),
	(4, 4, 5, 1, 100000, '2018-06-11 17:27:54', '2018-06-14 17:27:56', NULL),
	(5, 5, 3, 3, 540000, '2018-06-11 17:28:14', '2018-06-15 17:28:16', NULL),
	(6, 6, 2, 6, 300000, '2018-06-11 17:40:15', '2018-06-15 17:30:15', NULL),
	(7, 7, 2, 3, 1700000, '2018-06-11 18:20:15', '2018-06-14 18:20:15', NULL),
	(8, 3, 1, 1, 2018, '2018-06-14 01:42:00', '0000-00-00 00:00:00', NULL),
	(9, 9, 3, 1, 1, '2018-06-14 01:51:00', '2018-06-14 01:42:00', NULL),
	(10, 10, 3, 1, 1, '2018-06-14 01:53:00', '2018-06-14 01:42:00', NULL),
	(11, 11, 3, 1, 12, '2018-06-14 01:55:00', '2018-06-15 01:55:00', NULL),
	(12, 12, 3, 1, 123, '2018-06-14 02:00:00', '2018-06-24 01:59:00', NULL),
	(13, 13, 3, 1, 123, '2018-06-14 02:00:00', '2018-06-24 01:59:00', NULL),
	(14, 14, 3, 1, 123, '2018-06-14 02:00:00', '2018-06-24 01:59:00', NULL),
	(15, 15, 3, 1, 123, '2018-06-14 02:01:00', '2018-06-30 02:00:00', NULL),
	(16, 16, 3, 1, 123, '2018-06-14 02:01:00', '2018-06-30 02:00:00', NULL),
	(17, 17, 3, 1, 456, '2018-06-14 02:04:00', '2018-06-15 02:04:00', NULL),
	(18, 18, 3, 1, 1332, '2018-06-14 02:05:00', '2018-06-23 02:05:00', NULL),
	(19, 19, 3, 1, 432, '2018-06-14 02:06:00', '2018-06-10 02:06:00', NULL),
	(20, 20, 3, 1, 78, '2018-06-14 02:07:00', '2018-06-14 02:07:00', NULL),
	(21, 21, 3, 1, 452, '2018-06-14 04:47:00', '2018-06-14 04:47:00', NULL),
	(22, 22, 3, 1, 452, '2018-06-14 04:49:00', '2018-06-14 04:47:00', NULL);
/*!40000 ALTER TABLE `daugia` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.nguoidung
CREATE TABLE IF NOT EXISTS `nguoidung` (
  `manguoidung` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `matkhau` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `mathongtin` int(11) DEFAULT NULL,
  `dangnhap` int(11) DEFAULT NULL,
  `maquyen` int(11) DEFAULT NULL,
  `quyenban` int(11) DEFAULT NULL,
  `thoigianban` datetime DEFAULT NULL,
  PRIMARY KEY (`manguoidung`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.nguoidung: ~6 rows (approximately)
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT IGNORE INTO `nguoidung` (`manguoidung`, `email`, `matkhau`, `mathongtin`, `dangnhap`, `maquyen`, `quyenban`, `thoigianban`) VALUES
	(1, 'null', '0', 1, 1, 1, 1, '2018-01-01 00:00:00'),
	(2, 'admin@gmail.com', '123', 2, 0, 2, 0, '2030-01-01 00:00:00'),
	(3, 'demo@gmail.com', '123', 3, 0, 1, 0, '2030-06-13 01:03:28'),
	(4, 'demo1@gmail.com', '123', 4, 1, 1, 1, NULL),
	(5, 'demo2@gmail.com', '123', 5, 1, 1, 1, NULL),
	(6, 'demo3@gmail.com', '123', 6, 1, 1, 1, NULL);
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.nhatkydaugia
CREATE TABLE IF NOT EXISTS `nhatkydaugia` (
  `manhatky` int(11) NOT NULL AUTO_INCREMENT,
  `madaugia` int(11) NOT NULL DEFAULT '0',
  `thoigiandaugia` datetime DEFAULT NULL,
  `manguoidaugia` int(11) DEFAULT NULL,
  `giadaugia` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`manhatky`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.nhatkydaugia: ~16 rows (approximately)
/*!40000 ALTER TABLE `nhatkydaugia` DISABLE KEYS */;
INSERT IGNORE INTO `nhatkydaugia` (`manhatky`, `madaugia`, `thoigiandaugia`, `manguoidaugia`, `giadaugia`) VALUES
	(1, 1, '2018-06-10 20:43:51', 3, 3100000),
	(2, 7, '2018-06-11 10:50:30', 2, 1100000),
	(3, 7, '2018-06-11 10:50:54', 3, 1200000),
	(4, 7, '2018-06-11 10:50:59', 2, 1300000),
	(5, 7, '2018-06-11 10:51:02', 3, 1400000),
	(6, 7, '2018-06-11 10:51:28', 5, 1500000),
	(8, 7, '2018-06-11 10:52:56', 5, 1600000),
	(12, 3, '2018-06-11 10:55:45', 5, 300000),
	(13, 3, '2018-06-11 10:55:46', 5, 400000),
	(14, 3, '2018-06-11 10:55:47', 5, 500000),
	(15, 3, '2018-06-11 10:55:48', 5, 600000),
	(16, 3, '2018-06-11 10:55:50', 5, 700000),
	(17, 6, '2018-06-11 10:56:20', 6, 200000),
	(18, 6, '2018-06-11 10:56:29', 6, 300000),
	(19, 5, '2018-06-11 10:56:49', 3, 520000),
	(20, 5, '2018-06-11 10:56:50', 3, 540000);
/*!40000 ALTER TABLE `nhatkydaugia` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.nhatkymota
CREATE TABLE IF NOT EXISTS `nhatkymota` (
  `mamota` int(11) NOT NULL AUTO_INCREMENT,
  `madaugia` int(11) DEFAULT NULL,
  `mota` varchar(500) DEFAULT NULL,
  `thoigianthem` datetime DEFAULT NULL,
  PRIMARY KEY (`mamota`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- Dumping data for table daugiatructuyen.nhatkymota: ~27 rows (approximately)
/*!40000 ALTER TABLE `nhatkymota` DISABLE KEYS */;
INSERT IGNORE INTO `nhatkymota` (`mamota`, `madaugia`, `mota`, `thoigianthem`) VALUES
	(1, 5, 'ABC', '2018-06-14 04:40:53'),
	(2, 5, '<br>CHD', '2018-06-14 04:41:04'),
	(3, 22, '123', '2018-06-14 04:49:00'),
	(4, 5, '<b>Đây là mô tả thứ 3<b>', '2018-06-14 05:52:00'),
	(5, 5, '<br>\nĐừng đi', '2018-06-14 05:57:00'),
	(6, 5, 'Sarahee', '2018-06-14 05:59:00'),
	(7, 2, '<b>OK</b>', '2018-06-14 06:06:00'),
	(8, 5, 'Hí hí', '2018-06-14 06:08:00'),
	(9, 5, 'Hí hí', '2018-06-14 06:08:00'),
	(10, 5, 'Hí hí', '2018-06-14 06:08:00'),
	(11, 5, 'Hí hí', '2018-06-14 06:08:00'),
	(12, 5, 'Hí hí', '2018-06-14 06:08:00'),
	(13, 5, 'Hí hí', '2018-06-14 06:08:00'),
	(14, 5, 'Hí hí', '2018-06-14 06:09:00'),
	(15, 9, 'Test', '2018-06-14 06:13:00'),
	(16, 10, '456', '2018-06-14 06:13:00'),
	(17, 10, '456', '2018-06-14 06:14:00'),
	(18, 10, 'test', '2018-06-14 06:14:00'),
	(19, 12, '456789', '2018-06-14 06:15:00'),
	(20, 17, '789456', '2018-06-14 06:16:00'),
	(21, 12, 'qưerty', '2018-06-14 06:17:00'),
	(22, 13, '123456', '2018-06-14 06:20:00'),
	(23, 20, 'hiệp', '2018-06-14 06:54:00'),
	(24, 11, 'fdsa', '2018-06-14 06:55:00'),
	(25, 2, '<b>Nè</b>', '2018-06-14 06:56:00'),
	(26, 2, '<br>Khóc', '2018-06-14 06:56:00'),
	(27, 2, '', '2018-06-14 07:36:00');
/*!40000 ALTER TABLE `nhatkymota` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.sanpham
CREATE TABLE IF NOT EXISTS `sanpham` (
  `masanpham` int(11) NOT NULL AUTO_INCREMENT,
  `tensanpham` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `madanhmuc` bigint(20) DEFAULT NULL,
  `mota` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `link_img1` varchar(50) DEFAULT NULL,
  `link_img2` varchar(50) DEFAULT NULL,
  `link_img3` varchar(50) DEFAULT NULL,
  `giagoc` bigint(20) DEFAULT NULL,
  `giamuangay` bigint(20) DEFAULT NULL,
  `buocgia` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`masanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.sanpham: ~22 rows (approximately)
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT IGNORE INTO `sanpham` (`masanpham`, `tensanpham`, `madanhmuc`, `mota`, `link_img1`, `link_img2`, `link_img3`, `giagoc`, `giamuangay`, `buocgia`) VALUES
	(1, 'Iphone 6S', 1, 'ABC', NULL, NULL, NULL, 3000000, 5000000, 100000),
	(2, 'Nokia 6030', 2, 'ABC<br>CHD<b>Đây là mô tả thứ 3<b><br>\nĐừng điSara', NULL, NULL, NULL, 100000, NULL, 100000),
	(3, 'Sản phẩm 3', 3, 'Mô tả 3', NULL, NULL, NULL, 100000, NULL, 100000),
	(4, 'Sản phẩm 4', 2, 'Mô tả 4', NULL, NULL, NULL, 10000, NULL, 10000),
	(5, 'Sản phẩm 5', 1, 'Test', NULL, NULL, NULL, 100000, NULL, 20000),
	(6, 'Sản phẩm 6', 1, NULL, NULL, NULL, NULL, 100000, NULL, 100000),
	(7, 'Sản phẩm 7', 2, NULL, NULL, NULL, NULL, 500000, NULL, 100000),
	(8, 'q', 0, '1', 'a', 'img_1528915814753.jpeg', 'img_1528915814757.gif', 0, 1, 2),
	(9, 'q', 0, 'Test12345', 'a', 'img_1528915871282.jpeg', 'img_1528915871286.gif', 0, 1, 2),
	(10, 'q', 0, '456456test1234567890lkjhgfd', 'a', 'img_1528915998249.jpeg', 'img_1528915998253.gif', 0, 1, 2),
	(11, 'zx', 2, 'fdsa', 'img_1528916129135.jpeg', 'img_1528916129139.gif', 'img_1528916129140.jpeg', 12, 34, 56),
	(12, 'asd', 1, 'DONT', 'img_1528916413219.jpeg', 'img_1528916413224.jpeg', 'img_1528916413225.jpeg', 123, 0, 10000),
	(13, 'asd', 1, '123456', 'img_1528916418093.jpeg', 'img_1528916418093.jpeg', 'img_1528916418094.jpeg', 123, 0, 10000),
	(14, 'asd', 1, '753951', 'img_1528916456451.jpeg', 'img_1528916456451.jpeg', 'img_1528916456451.jpeg', 123, 0, 10000),
	(15, '123', 1, 'DONT', 'img_1528916481778.jpeg', 'img_1528916481778.png', 'img_1528916481778.jpeg', 123, 45, 122),
	(16, '123', 1, '', 'img_1528916483323.jpeg', 'img_1528916483323.png', 'img_1528916483323.jpeg', 123, 45, 122),
	(17, 'ggg', 1, '789456', 'img_1528916684502.jpeg', 'img_1528916684502.jpeg', 'img_1528916684502.jpeg', 456, 789, 12),
	(18, 'zzz', 1, '', 'img_1528916728743.jpeg', 'img_1528916728744.gif', 'img_1528916728744.jpeg', 1332, 7895, 1000),
	(19, 'qqqwe', 1, '', 'img_1528916806833.jpeg', 'img_1528916806833.jpeg', 'img_1528916806834.jpeg', 432, 0, 10),
	(20, 'sp', 1, 'hiệp', 'img_1528916875654.jpeg', 'img_1528916875655.jpeg', 'img_1528916875655.jpeg', 78, 96, 1),
	(21, 'cvbnm', 1, '123', 'img_1528926446383.jpeg', 'img_1528926446389.jpeg', 'img_1528926446390.jpeg', 452, 786, 78),
	(22, 'cvbnm', 1, '123', 'img_1528926548446.jpeg', 'img_1528926548449.jpeg', 'img_1528926548450.jpeg', 452, 786, 78);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.sanphamyeuthich
CREATE TABLE IF NOT EXISTS `sanphamyeuthich` (
  `mayeuthich` int(11) NOT NULL AUTO_INCREMENT,
  `manguoidung` int(11) DEFAULT NULL,
  `masanpham` int(11) DEFAULT NULL,
  PRIMARY KEY (`mayeuthich`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.sanphamyeuthich: ~3 rows (approximately)
/*!40000 ALTER TABLE `sanphamyeuthich` DISABLE KEYS */;
INSERT IGNORE INTO `sanphamyeuthich` (`mayeuthich`, `manguoidung`, `masanpham`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 2, 1);
/*!40000 ALTER TABLE `sanphamyeuthich` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.sessions: ~0 rows (approximately)
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.test
CREATE TABLE IF NOT EXISTS `test` (
  `col` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table daugiatructuyen.test: ~4 rows (approximately)
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT IGNORE INTO `test` (`col`) VALUES
	('0000-00-00 00:00:00'),
	('0000-00-00 00:00:00'),
	('0011-12-18 13:17:17'),
	('2018-06-15 17:30:15');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.thongtinnguoidung
CREATE TABLE IF NOT EXISTS `thongtinnguoidung` (
  `manguoidung` int(11) NOT NULL AUTO_INCREMENT,
  `tennguoidung` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL DEFAULT '0',
  `diachi` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL DEFAULT '0',
  `luotthich` int(11) NOT NULL DEFAULT '0',
  `luotkhongthich` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`manguoidung`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.thongtinnguoidung: ~6 rows (approximately)
/*!40000 ALTER TABLE `thongtinnguoidung` DISABLE KEYS */;
INSERT IGNORE INTO `thongtinnguoidung` (`manguoidung`, `tennguoidung`, `diachi`, `luotthich`, `luotkhongthich`) VALUES
	(1, '0', '0', 0, 0),
	(2, 'ADMIN', 'Hồ Chí Minh', 50, 50),
	(3, 'Tấn Hiệp', 'Nha Trang', 70, 100),
	(4, 'Demo', 'Hồ Chí Minh', 10, 100),
	(5, 'Demo1', 'HCM', 10, 10),
	(6, 'Demo2', 'HCM', 10, 10),
	(7, 'Demo3', 'HCM', 10, 10);
/*!40000 ALTER TABLE `thongtinnguoidung` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
