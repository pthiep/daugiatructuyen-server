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
CREATE DATABASE IF NOT EXISTS `daugiatructuyen` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `daugiatructuyen`;

-- Dumping structure for table daugiatructuyen.daugia
CREATE TABLE IF NOT EXISTS `daugia` (
  `madaugia` int(11) NOT NULL AUTO_INCREMENT,
  `masanpham` int(11) NOT NULL DEFAULT '0',
  `manguoiban` int(11) NOT NULL DEFAULT '0',
  `manguoidaugia` int(11) NOT NULL DEFAULT '0',
  `giadaugia` decimal(10,0) NOT NULL DEFAULT '0',
  `thoigian` datetime DEFAULT NULL,
  PRIMARY KEY (`madaugia`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.daugia: ~1 rows (approximately)
/*!40000 ALTER TABLE `daugia` DISABLE KEYS */;
INSERT IGNORE INTO `daugia` (`madaugia`, `masanpham`, `manguoiban`, `manguoidaugia`, `giadaugia`, `thoigian`) VALUES
	(1, 1, 1, 0, 3100000, '2018-06-07 23:14:45');
/*!40000 ALTER TABLE `daugia` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.nguoidung
CREATE TABLE IF NOT EXISTS `nguoidung` (
  `manguoidung` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `matkhau` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `mathongtin` int(11) DEFAULT NULL,
  PRIMARY KEY (`manguoidung`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.nguoidung: ~2 rows (approximately)
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT IGNORE INTO `nguoidung` (`manguoidung`, `email`, `matkhau`, `mathongtin`) VALUES
	(1, 'admin@gmail.com', '123', 1),
	(2, 'demo@gmail.com', '456', 2);
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.sanpham
CREATE TABLE IF NOT EXISTS `sanpham` (
  `masanpham` int(11) NOT NULL AUTO_INCREMENT,
  `tensanpham` varchar(50) DEFAULT NULL,
  `giagoc` bigint(20) DEFAULT NULL,
  `giamuangay` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`masanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.sanpham: ~2 rows (approximately)
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT IGNORE INTO `sanpham` (`masanpham`, `tensanpham`, `giagoc`, `giamuangay`) VALUES
	(1, 'Iphone 6S', 3000000, 5000000),
	(2, 'Nokia 6030', 15000000, NULL);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.sanphamyeuthich
CREATE TABLE IF NOT EXISTS `sanphamyeuthich` (
  `mayeuthich` int(11) NOT NULL AUTO_INCREMENT,
  `manguoidung` int(11) DEFAULT NULL,
  `masanpham` int(11) DEFAULT NULL,
  PRIMARY KEY (`mayeuthich`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.sanphamyeuthich: ~2 rows (approximately)
/*!40000 ALTER TABLE `sanphamyeuthich` DISABLE KEYS */;
INSERT IGNORE INTO `sanphamyeuthich` (`mayeuthich`, `manguoidung`, `masanpham`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 2, 1);
/*!40000 ALTER TABLE `sanphamyeuthich` ENABLE KEYS */;

-- Dumping structure for table daugiatructuyen.thongtinnguoidung
CREATE TABLE IF NOT EXISTS `thongtinnguoidung` (
  `manguoidung` int(11) NOT NULL AUTO_INCREMENT,
  `tennguoidung` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL DEFAULT '0',
  `diachi` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`manguoidung`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table daugiatructuyen.thongtinnguoidung: ~2 rows (approximately)
/*!40000 ALTER TABLE `thongtinnguoidung` DISABLE KEYS */;
INSERT IGNORE INTO `thongtinnguoidung` (`manguoidung`, `tennguoidung`, `diachi`) VALUES
	(1, 'ADMIN', 'Hồ Chí Minh'),
	(2, 'Phan Tấn Hiệp', 'Nha Trang');
/*!40000 ALTER TABLE `thongtinnguoidung` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
