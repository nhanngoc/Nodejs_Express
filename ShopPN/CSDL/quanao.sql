-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 21, 2022 at 11:43 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanao`
--

-- --------------------------------------------------------

--
-- Table structure for table `anhct`
--

DROP TABLE IF EXISTS `anhct`;
CREATE TABLE IF NOT EXISTS `anhct` (
  `anh_id` int(11) NOT NULL AUTO_INCREMENT,
  `MaSP` int(11) DEFAULT NULL,
  `anh_ten` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`anh_id`),
  KEY `MaSP` (`MaSP`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `anhct`
--

INSERT INTO `anhct` (`anh_id`, `MaSP`, `anh_ten`) VALUES
(1, 11, 'DAITAYMICKEY2.jpg'),
(2, 11, 'DAITAYMICKEY3.jpg'),
(3, 12, 'aokhoatloveisxanh.jpg'),
(4, 12, 'aokhoatloveisXAM.jpg'),
(5, 12, 'aokhoatloveisvang.jpg'),
(6, 5, 'pijamabegaitrang.jpg'),
(7, 5, 'pijamabegaihong.jpg'),
(8, 6, 'pijamagaupoohchutrang.jpg'),
(9, 6, 'pijamagaupoohchuhong.jpg'),
(10, 8, 'BOSOCcarazyvang.jpg'),
(11, 8, 'BOSOCDONALHONGRUO.jpg'),
(12, 8, 'BOSOCMICKEYHONGSEN.jpg'),
(13, 9, 'BOSOCDONALHONGRUO.jpg'),
(14, 9, 'BOSOCcarazyvang.jpg'),
(15, 9, 'BOSOCMICKEYHONGSEN.jpg'),
(16, 10, 'SETJOGGERHINH1.jpg'),
(17, 10, 'SETJOGGERHINH2.jpg'),
(18, 10, 'SETJOGGERHINH3.jpg'),
(19, 32, 'BOLUNGMICKEYCAROtim.jpg'),
(20, 32, 'BOLUNGMICKEYCAROHONGSEN.jpg'),
(21, 32, 'BOLUNGMICKEYCAROvang.jpg'),
(22, 36, 'pijamagaupoohxanh.jpg'),
(23, 36, 'pijamagaupoohhong.jpg'),
(24, 36, 'pijamagaupoohdo.jpg'),
(25, 37, 'bohoathonh3dvang.jpg'),
(26, 37, 'bohoathonh3dhongdau.jpg'),
(27, 38, 'pijamaluaxanh1.jpg'),
(28, 38, 'pijamaluaxanh2.jpg'),
(29, 38, 'pijamaluahong1.jpg'),
(30, 38, 'pijamaluahong2.jpg'),
(31, 39, 'bomatcuoikingcam.jpg'),
(32, 39, 'bomatcuoikinghong.jpg'),
(33, 40, 'bomickeytoanthanxanh.jpg'),
(34, 40, 'bomickeytoanthansen2.jpg'),
(35, 40, 'bomickeytoanthancam.jpg'),
(36, 41, 'bomickeytoanthansen2.jpg'),
(37, 41, 'bomickeytoanthancam.jpg'),
(38, 41, 'bomickeytoanthanxanh.jpg'),
(39, 42, 'SETLEGGINGNHIEUGAUVANG.jpg'),
(40, 42, 'SETLEGGINGNHIEUGAUCAMSUA.jpg'),
(41, 42, 'SETLEGGINGNHIEUGAUCAFE.jpg'),
(42, 43, 'SETLEGGINGNHIEUGAUCAMSUA.jpg'),
(43, 43, 'SETLEGGINGNHIEUGAUCAFE.jpg'),
(44, 43, 'SETLEGGINGNHIEUGAUVANG.jpg'),
(45, 44, 'damcosenbiden.jpg'),
(46, 44, 'damcosenbivang.jpg'),
(47, 44, 'damcosenbixanh.jpg'),
(48, 45, 'damtanghoado.jpg'),
(49, 45, 'damtanghoado1.jpg'),
(50, 46, 'damduoicaphoibotrang2.jpg'),
(51, 46, 'damduoicaphoibotrang.jpg'),
(52, 47, 'damtangcauvong2.jpg'),
(53, 47, 'damtangcauvong1.jpg'),
(54, 47, 'damtangcauvong3.jpg'),
(55, 48, 'setboiphaomeo1.jpg'),
(56, 48, 'setboiphaomeo2.jpg'),
(57, 49, 'doboi4monden.jpg'),
(58, 49, 'doboi4monvang.jpg'),
(59, 49, 'doboi4monhong.jpg'),
(60, 49, 'doboi4montim.jpg'),
(61, 50, 'setboivang.jpg'),
(62, 50, 'setboido.jpg'),
(63, 51, 'SETBOITHOHONG.jpg'),
(64, 51, 'SETBOITHOHONG1.jpg'),
(65, 51, 'SETBOITHOHONG2.jpg'),
(66, 52, 'SETNKEXANH.jpg'),
(67, 52, 'SETNKECAM.jpg'),
(68, 52, 'SETNKEDO.jpg'),
(69, 53, 'setphoimauessvang.jpg'),
(70, 53, 'setphoimauessden.jpg'),
(71, 54, 'bojordan1.jpg'),
(72, 54, 'bojordan2.jpg'),
(73, 55, 'squidgamedaitay.jpg'),
(74, 56, 'pijamakhunglongxanh.jpg'),
(75, 57, 'setaononawesomexanh.jpg'),
(76, 58, 'setboiphaobatmanxanh1.jpg'),
(77, 58, 'setboiphaobatmanxanh2.jpg'),
(78, 59, 'SETBOINHENKEMNONDO.jpg'),
(79, 59, 'SETBOINHENKEMNONDO1.jpg'),
(80, 60, 'SETBOICAMAPXANH.jpg'),
(81, 60, 'SETBOICAMAPXANH1.jpg'),
(82, 61, 'BOIDAITAYSIEUNHANXANH.jpg'),
(83, 62, 'aothuntrautetdo.jpg'),
(84, 62, 'aothuntrautetvang.jpg'),
(85, 63, 'aosomihuouxanh1.jpg'),
(86, 63, 'aosomihuouxanh2.jpg'),
(87, 64, 'aohoddietoronto2.jpg'),
(88, 64, 'aohoddietoronto3.jpg'),
(89, 65, 'aohoodiebosuavang.jpg'),
(90, 65, 'aohoodiebosuavang1.jpg'),
(91, 66, 'quanjeanswashrach1.jpg'),
(92, 66, 'quanjeanswashrach2.jpg'),
(93, 73, 'quanjeanongrongnhat.jpg'),
(94, 73, 'quanjeanongrongdam.jpg'),
(95, 74, 'jeansjogger2.jpg'),
(96, 74, 'jeansjogger3.jpg'),
(97, 75, 'quanjeanslechlaixanh.jpg'),
(98, 75, 'quanjeanslechlaiden.jpg'),
(99, 76, 'quansortjeanhlden.jpg'),
(100, 76, 'quansortjeanhltrang.jpg'),
(101, 77, 'quanlungjeanmoctrang.jpg'),
(102, 77, 'quanlungjeanmocden.jpg'),
(103, 78, 'QUANBOMERTRANG.jpg'),
(104, 78, 'QUANBOMERTRANG1.jpg'),
(105, 79, 'quansortjeanb2kid3.jpg'),
(106, 79, 'quansortjeanb2kid2.jpg'),
(107, 79, 'quansortjeanb2kid1.jpg'),
(108, 80, 'quanjeantuikieu2.jpg'),
(109, 80, 'quanjeantuikieu1.jpg'),
(110, 81, 'quandacabostonxam.jpg'),
(111, 81, 'quandacabostonxanhchuoi.jpg'),
(112, 82, 'QUANSORTJEANMICKEYTRANG1.jpg'),
(113, 83, 'QUANJEANLUNGMATCUOI1.jpg'),
(114, 83, 'QUANJEANLUNGMATCUOI3.jpg'),
(115, 84, 'setjeancroptopvang.jpg'),
(116, 85, 'qunajeans1.jpg'),
(117, 86, 'quanjoggertuihop1.jpg'),
(118, 87, 'quankakilungden.jpg'),
(119, 88, 'quankakikhoakeoxanh.jpg'),
(120, 89, 'quandacaden.jpg'),
(121, 90, 'quandacacam.jpg'),
(122, 91, 'quankakimocden3.jpg'),
(123, 91, 'quankakimocden2.jpg'),
(124, 91, 'quankakimocden1.jpg'),
(125, 92, 'quandaca1.jpg'),
(126, 93, 'jeansmocdo.jpg'),
(127, 94, 'quanjeansjoggerxanh1.jpg'),
(128, 94, 'quanjeansjoggerxanh.jpg'),
(129, 95, 'qunajogerinchuxden.jpg'),
(130, 95, 'qunajogerinchuxam.jpg'),
(131, 95, 'qunajogerinchuvang.jpg'),
(132, 96, 'QUANJOGERHOAVANVANG.jpg'),
(133, 96, 'QUANJOGERHOAVANXANHDUONG.jpg'),
(134, 97, 'quanjoggercamdat.jpg'),
(135, 97, 'quanjoggerden.jpg'),
(136, 98, 'quandacaphoisocden.jpg'),
(137, 98, 'quandacaphoisocxam.jpg'),
(138, 99, 'quandaido.jpg'),
(139, 99, 'quandaikem.jpg'),
(140, 100, 'QUANBOCAODEN.jpg'),
(141, 100, 'QUANBOCAOXAM.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `chitiethd`
--

DROP TABLE IF EXISTS `chitiethd`;
CREATE TABLE IF NOT EXISTS `chitiethd` (
  `mact` int(11) NOT NULL AUTO_INCREMENT,
  `mahd` int(11) NOT NULL,
  `masp` int(11) NOT NULL,
  `tensp` varchar(100) DEFAULT NULL,
  `dongia` int(11) NOT NULL,
  `quantity` tinyint(11) DEFAULT NULL,
  `gia` int(11) DEFAULT NULL,
  `ma_id` int(11) NOT NULL,
  PRIMARY KEY (`mact`),
  KEY `MaHD` (`mahd`),
  KEY `MaSP` (`masp`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chitiethd`
--

INSERT INTO `chitiethd` (`mact`, `mahd`, `masp`, `tensp`, `dongia`, `quantity`, `gia`, `ma_id`) VALUES
(1, 1, 11, 'Màu Đen-Size 11', 99000, 1, 99000, 6),
(2, 2, 35, 'Màu Vàng-Size 2', 70000, 2, 140000, 75),
(3, 3, 82, 'Màu Trắng-Size 6', 145000, 1, 145000, 294),
(4, 3, 97, 'Màu Cam-Size 6', 105000, 3, 315000, 349),
(5, 3, 97, 'Màu Đen-Size 6', 105000, 2, 210000, 351),
(6, 4, 9, 'Màu Đỏ-Size 5', 142000, 1, 142000, 58),
(7, 5, 11, 'Màu Đen-Size 15', 99000, 7, 693000, 10),
(8, 6, 92, 'Màu Xám-Size 9', 100000, 4, 400000, 330),
(9, 7, 9, 'Màu Hồng-Size 2', 142000, 3, 426000, 55);

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
CREATE TABLE IF NOT EXISTS `colors` (
  `color_id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`color_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`color_id`, `color`) VALUES
(0, 'Màu Trắng'),
(1, 'Màu Đỏ'),
(2, 'Màu Cam'),
(3, 'Màu Vàng'),
(4, 'Màu Xám'),
(5, 'Màu Đen'),
(6, 'Màu Nâu'),
(7, 'Màu Hồng'),
(8, 'Màu Xanh Lá'),
(9, 'Màu Xanh Dương'),
(10, 'Màu Tím'),
(11, 'Màu Ảnh'),
(12, 'Màu Xanh Biển');

-- --------------------------------------------------------

--
-- Table structure for table `danhmuc`
--

DROP TABLE IF EXISTS `danhmuc`;
CREATE TABLE IF NOT EXISTS `danhmuc` (
  `MaDM` int(11) NOT NULL AUTO_INCREMENT,
  `TenDM` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`MaDM`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `danhmuc`
--

INSERT INTO `danhmuc` (`MaDM`, `TenDM`) VALUES
(0, 'Bé gái'),
(1, 'Bé trai'),
(2, 'Phụ kiện');

-- --------------------------------------------------------

--
-- Table structure for table `giamgia`
--

DROP TABLE IF EXISTS `giamgia`;
CREATE TABLE IF NOT EXISTS `giamgia` (
  `makm` int(11) NOT NULL,
  `giakm` int(50) DEFAULT NULL,
  PRIMARY KEY (`makm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `giamgia`
--

INSERT INTO `giamgia` (`makm`, `giakm`) VALUES
(7, 140000),
(8, 100000),
(9, 142000),
(10, 120000),
(11, 99000),
(32, 100000),
(33, 120000),
(34, 100000),
(35, 70000),
(36, 149000),
(40, 60000);

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

DROP TABLE IF EXISTS `hoadon`;
CREATE TABLE IF NOT EXISTS `hoadon` (
  `mahd` int(11) NOT NULL AUTO_INCREMENT,
  `makh` int(11) NOT NULL,
  `ngayhd` tinytext,
  `tennn` varchar(50) DEFAULT NULL,
  `sdt` char(10) NOT NULL,
  `diachi` varchar(50) DEFAULT NULL,
  `pttt` varchar(50) DEFAULT NULL,
  `soluong` int(11) NOT NULL,
  `tongtien` float NOT NULL,
  `ngaynhan` datetime DEFAULT NULL,
  `ghichu` text NOT NULL,
  `trangthai` varchar(50) NOT NULL,
  PRIMARY KEY (`mahd`),
  KEY `MaKH` (`makh`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hoadon`
--

INSERT INTO `hoadon` (`mahd`, `makh`, `ngayhd`, `tennn`, `sdt`, `diachi`, `pttt`, `soluong`, `tongtien`, `ngaynhan`, `ghichu`, `trangthai`) VALUES
(1, 18, '19-1-2022', 'nhan ngoc', '0147852366', 'ap an dong, An Thoi Dong, Can Gio, Hồ Chí Minh', NULL, 1, 99000, NULL, '', 'Đã nhận hàng'),
(2, 18, '20-1-2022', 'nhan ngoc', '0147852366', 'ap an dong, An Thoi Dong, Can Gio, Hồ Chí Minh', NULL, 2, 140000, NULL, '', 'Đã nhận hàng'),
(3, 50, '20-1-2022', 'ngoc nhan23', '0000012332', 'duong 170/11, phường 5, quận 10, Hồ Chí Minh', NULL, 6, 670000, NULL, '', 'Đã nhận hàng'),
(4, 50, '20-1-2022', 'ngoc nhan23', '0000012332', 'duong 170/11, phường 5, quận 10, Hồ Chí Minh', NULL, 1, 142000, NULL, '', 'Chờ xác nhận'),
(5, 50, '20-1-2022', 'ngoc nhan23', '0000012332', 'duong 170/11, phường 5, quận 10, Hồ Chí Minh', NULL, 7, 693000, NULL, '', 'Chờ xác nhận'),
(6, 50, '21-1-2022', 'ngoc nhan23', '0000012332', 'duong 170/11, phường 5, quận 10, Hồ Chí Minh', NULL, 4, 400000, NULL, '', 'Chờ xác nhận'),
(7, 50, '21-1-2022', 'ngoc nhan23', '0000012332', 'duong 170/11, phường 5, quận 10, Hồ Chí Minh', NULL, 3, 426000, NULL, '', 'Chờ xác nhận');

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
CREATE TABLE IF NOT EXISTS `khachhang` (
  `MaKH` int(11) NOT NULL AUTO_INCREMENT,
  `tenkh` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sdt` char(10) DEFAULT NULL,
  `diachi` varchar(255) NOT NULL,
  `phuong_xa` varchar(200) NOT NULL,
  `quan_huyen` varchar(200) NOT NULL,
  `tinh` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`MaKH`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`MaKH`, `tenkh`, `username`, `password`, `email`, `sdt`, `diachi`, `phuong_xa`, `quan_huyen`, `tinh`) VALUES
(18, 'nhan ngoc', 'ngocnhan', '$2a$10$QbFms9VnbD70bi5H6uKz2.LzlIGMSSl7m7tOZ34lSi4dduESfD1Zu', 'phamlinh6016@gmail.com', '0147852367', 'ap an dong', 'An Thoi Dong', 'Cần Giờ', 'Hồ Chí Minh'),
(50, 'ngoc nhan23', 'ngocnhan1', '$2a$10$QbFms9VnbD70bi5H6uKz2.LzlIGMSSl7m7tOZ34lSi4dduESfD1Zu', 'nnhann2000@gmail.com', '0000012332', 'duong 170/11', 'phường 5', 'quận 10', 'Hồ Chí Minh'),
(51, 'nhân phạm', 'ngocnhan2', '$2a$10$QbFms9VnbD70bi5H6uKz2.LzlIGMSSl7m7tOZ34lSi4dduESfD1Zu', 'nnhann909@gmail.com', '0337876016', '180 cao lỗ', 'phường 4', 'quận 8', 'Hồ Chí Minh'),
(52, 'nhân phạm', 'ngocnhan3', '$2a$10$QbFms9VnbD70bi5H6uKz2.LzlIGMSSl7m7tOZ34lSi4dduESfD1Zu', 'nnhann990@gmail.com', '0337876016', '180 cao lỗ', 'phường 4', 'quận 8', 'Hồ Chí Minh'),
(53, 'Nhân ngọc', 'nhanngoc', '$2a$10$QbFms9VnbD70bi5H6uKz2.LzlIGMSSl7m7tOZ34lSi4dduESfD1Zu', 'nnhann123@gmail.com', '0337876011', '180 cao lỗ', 'phường 4', 'quận 8', 'Hồ Chí Minh'),
(54, 'ngoc nhan23', 'nhanngoc1', '$2a$10$QbFms9VnbD70bi5H6uKz2.LzlIGMSSl7m7tOZ34lSi4dduESfD1Zu', 'nnhann1999@gmail.com', '0000012333', '180 cao lỗ', 'phường 4', 'quận 8', 'Hồ Chí Minh'),
(55, 'nnanaư ef ưdd', 'ngocnhan11', '$2a$10$QbFms9VnbD70bi5H6uKz2.LzlIGMSSl7m7tOZ34lSi4dduESfD1Zu', 'nnhann9991@gmail.com', '0337876016', 'ấp an đông', 'xã an thới đông', 'huyện cần giờ', 'Hồ Chí Minh'),
(56, 'ngocnhan2', 'ngocnhan12', '$2a$10$QbFms9VnbD70bi5H6uKz2.LzlIGMSSl7m7tOZ34lSi4dduESfD1Zu', 'nnhann999@gmail.com', '0000012313', 'ấp an đông', 'xã an thới đông', 'huyện cần giờ', 'Hồ Chí Minh'),
(57, 'ngọc nhân', 'ngocnhan22', '$2a$10$QbFms9VnbD70bi5H6uKz2.LzlIGMSSl7m7tOZ34lSi4dduESfD1Zu', 'abcd1234@gmail.com', '0924578618', 'ấp an đông', 'xã an thới đông', 'huyện cần giờ', 'Hồ Chí Minh'),
(58, 'ngoc nhan23', 'ngocnhan33', '$2a$10$QbFms9VnbD70bi5H6uKz2.LzlIGMSSl7m7tOZ34lSi4dduESfD1Zu', 'nnhann9911@gmail.com', '0000012333', '180 cao lỗ', 'phường 4', 'quận 8', 'Hồ Chí Minh');

-- --------------------------------------------------------

--
-- Table structure for table `loaisp`
--

DROP TABLE IF EXISTS `loaisp`;
CREATE TABLE IF NOT EXISTS `loaisp` (
  `MaLoai` int(11) NOT NULL AUTO_INCREMENT,
  `MaDM` int(11) DEFAULT NULL,
  `TenLoai` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`MaLoai`),
  KEY `MaDM` (`MaDM`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `loaisp`
--

INSERT INTO `loaisp` (`MaLoai`, `MaDM`, `TenLoai`) VALUES
(0, 0, 'Đồ bộ bé gái'),
(1, 0, 'Đầm bé gái'),
(2, 0, 'Đồ bơi bé gái'),
(3, 0, 'Áo bé gái'),
(4, 0, 'Quần bé gái'),
(5, 1, 'Đồ bộ bé trai'),
(6, 1, 'Đồ bơi bé trai'),
(7, 1, 'Áo bé trai'),
(8, 1, 'Quần bé trai'),
(10, 2, 'Giày bé trai'),
(11, 2, 'Nón cho bé'),
(12, 2, 'Ba lô túi đeo');

-- --------------------------------------------------------

--
-- Table structure for table `quantri`
--

DROP TABLE IF EXISTS `quantri`;
CREATE TABLE IF NOT EXISTS `quantri` (
  `manv` int(11) NOT NULL AUTO_INCREMENT,
  `tennv` varchar(30) NOT NULL,
  `gioitinh` char(3) DEFAULT NULL,
  `ngaysinh` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `sdt` varchar(10) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `quyen` varchar(25) NOT NULL,
  PRIMARY KEY (`manv`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `quantri`
--

INSERT INTO `quantri` (`manv`, `tennv`, `gioitinh`, `ngaysinh`, `email`, `sdt`, `username`, `password`, `quyen`) VALUES
(4, 'Ngọc Nhân', 'Nữ', '2001-02-10', 'nnhann990@gmail.com', '0000012313', 'nnhann99', '$2a$10$YCrC2MRR1hrDTZeeaFJ3a.n7f7BZDL9J.dfJSaYOocXP9jkElk2ki', 'nhanvien'),
(5, 'ngọc nhân', 'Nam', '1999-02-24', 'nnhann99@gmail.com', '0337876016', 'nhanadmin', '$2a$10$x5o6X9qau0DKjBGQwY/l0u9gNx2yVaxG0WfC8gzn7JeeX62qrBoba', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
CREATE TABLE IF NOT EXISTS `sanpham` (
  `MaSP` int(11) NOT NULL AUTO_INCREMENT,
  `MaLoai` int(11) NOT NULL,
  `TenSP` varchar(100) NOT NULL,
  `Anh` varchar(100) DEFAULT NULL,
  `SoLuongBan` int(11) DEFAULT NULL,
  `Gia` int(11) DEFAULT NULL,
  `MoTa` text,
  `chatlieu` varchar(50) NOT NULL,
  `TinhTrang` varchar(50) DEFAULT NULL,
  `NgayNhap` tinytext,
  PRIMARY KEY (`MaSP`),
  KEY `MaLoai` (`MaLoai`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`MaSP`, `MaLoai`, `TenSP`, `Anh`, `SoLuongBan`, `Gia`, `MoTa`, `chatlieu`, `TinhTrang`, `NgayNhap`) VALUES
(4, 3, '[SIZE ĐẠI] Áo hoodie sọc in chữ Crime dễ thương cho bé từ 10 - 15 Tuổi', 'aohoodie1.jpg', 3, 119000, 'Áo hoodie sọc CREME năng động - sành điệu cho bé mix đồ thời tiết giao mùa. Chất thun cotton chính phẩm co giãn 4c, mềm mịn. Sọc in thắm sắc nét. Style năng động, dễ mặc, dễ phối đồ.', 'Thun cotton', 'Còn hàng', '19-11-2021'),
(5, 0, '[SIZE ĐẠI] Pijama in bé gái dễ thương cho bé gái 10 - 15 Tuổi ', 'pijamabegaitrang.jpg', 2, 50000, 'Pizama tay ngắn quần dài siêu xinh cho các bé gái. Chất liệu satin mềm mịn, thoải mái khi mặc, hình in sắc sảo, đáng yêu.', 'LỤA SATIN', 'Còn hàng', '19-11-2021'),
(6, 0, '[SIZE ĐẠI] Pijama in gấu Pooh chữ dễ thương cho bé gái 10 - 15 Tuổi', 'pijamagaupoohchutrang.jpg', 3, 40000, 'Pizama tay ngắn quần dài siêu xinh cho các bé gái. Chất liệu satin mềm mịn, thoải mái khi mặc, hình in sắc sảo, đáng yêu.', 'LỤA SATIN', 'Còn hàng', '19-11-2021'),
(7, 3, '[SIZE ĐẠI] Áo khoát 7 màu dễ thương cho bé gái từ 2 - 15 Tuổi', 'aokhoat7mau1.jpg', 3, 155000, 'Chào mẫu áo khoác da cá rực rỡ sắc màu cho bé chào hè. Chất thun da cá loại 1 mịn đẹp, thấm hút mồ hôi tốt. Hình in sắc sảo, bao không bong tróc. Phía trước áo có mổ túi như hình chào.', 'Thun da cá', 'Còn hàng', '19-11-2021'),
(8, 0, '[SIZE ĐẠI] Set quần sọc áo thun hình dễ thương cho bé gái 10 - 16 Tuổi', 'BOSOCcarazyvang.jpg', 2, 169000, 'Set đùi sọc in hình dễ thương cho bé gái. Nguyên bộ chất thun cotton mềm mát, bao đẹp nha. Áo in hình sắc nét, đáng yêu. Quần sọc phối dây gút giả khỏe khoắn.', 'Thun cotton', 'Còn hàng', '19-11-2021'),
(9, 0, '[SIZE ĐẠI] Set quần sọc áo thun hình dễ thương cho bé gái 10 - 16 Tuổi', 'BOSOCDONALHONGRUO.jpg', 3, 169000, 'Set đùi sọc in hình dễ thương cho bé gái. Nguyên bộ chất thun cotton mềm mát, bao đẹp nha. Áo in hình sắc nét, đáng yêu. Quần sọc phối dây gút giả khỏe khoắn.', 'Thun cotton', 'Còn hàng', '19-11-2021'),
(10, 0, '[SIZE ĐẠI] Set jogger loang màu dễ thương cho bé gái 10 - 15 Tuổi', 'SETJOGGERHINH1.jpg', 2, 168000, 'Sét áo croptop quần jogger dễ thương cho bé. Chất thun loang 100% cotton chính phẩm 4 chiều. Hình in cham sắc nét bao bông tróc, bỏ máy giặt thoải mái.', 'Thun cotton', 'Còn hàng', '19-11-2021'),
(11, 3, 'Bộ dài tay Mickey dễ thương cho bé từ 10 - 16 Tuổi', 'DAITAYMICKEY2.jpg', NULL, 185000, 'Bộ thun dài tay Mickey dễ thương cho bé trai & bé gái. Nguyên bộ thun cotton mềm mát, thấm hút mồ hôi. Hình in sắc nét không bong tróc.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(12, 7, 'Áo khoát da cá LOVE IS RED dễ thương cho bé từ 2 - 9 Tuổi', 'aokhoatloveisvang.jpg', 4, 133000, 'Áo khoát cho bé đơn giản nhưng sang trọng. Áo may bằng chất da cá cotton 4c, chất vải vừa mình ko dày cộm mềm mịn co giãn thoải. Cổ, tay và lai may vải bo cotton dệt co giãn, 2 bên đắp túi, núp bọc vải cùng màu. Hình thêu sắc nét.', 'Thun cotton', 'Còn hàng', '19-11-2021'),
(32, 0, '[SIZE ĐẠI] Bộ lửng caro vịt dễ thương cho bé gái 10 - 15 Tuổi', 'BOLUNGMICKEYCAROtim.jpg', NULL, 143000, 'Bộ lửng siêu dễ thương mẹ và bé có thể diện chung đôi. Nguyên bộ may bằng chất thun cotton 4c mềm mịn, áo form rộng qua mông, hình in thấm toàn thân áo sắc nét, bo cổ theo màu quần. Quần form ôm hình in mickey dễ thương.', 'Thun cotton', NULL, '19-11-2021'),
(33, 3, 'Áo khoát dạ viền len dễ thương cho bé gái từ 2 - 9 Tuổi', 'aokhaotdavienlenden.jpg', NULL, 160000, 'Áo khoác kiểu sang trọng cho bé gái. Áo khoác dạng lở ngang lưng quần được may trên chất liệu Tweed nhập. Cổ, lai và tay được trang trí bởi dây len kết hợp kim tuyến sang trọng, áo đính khuy nút chắc chắn. Có thể mix rất nhiều dạng.', 'Tweed', NULL, '19-11-2021'),
(34, 3, 'Áo khoát kaki dễ thương cho bé gái từ 2 - 9 Tuổi', 'AOKHOACKAKI3.jpg', NULL, 150000, 'Style năng động- bắt trend với mẫu áo khoác KAKI sang chảnh cho bé gái. Chất Kaki nhập mềm mại, co giãn. Áo may đắp túi 2 bên sang trọng. Đơn giản nhưng tiện lợi, mùa nắng hay mưa đều diện được.', 'Kaki', NULL, '19-11-2021'),
(35, 3, 'Áo dây nơ ngực dễ thương cho bé gái từ 2 - 9 Tuổi', 'aonongucall2.jpg', NULL, 85000, 'Ao dây nơ siêu xinh cho baby girl. Chất thun cotton 4c co giãn, mềm mát, form chuẩn, may nơ trước cực iu. Có thể phối quần dài hoặc ngắn đều đẹp.', 'Thun cotton', NULL, '19-11-2021'),
(36, 0, '[SIZE ĐẠI] Pijama gấu pooh dễ thương cho bé gái 10 - 15 Tuổi', 'pijamagaupoohxanh.jpg', NULL, 172000, 'Pijama gấu Pooh siêu yêu cho bé gái mặc nhà. Chất liệu satin mềm mịn thoải mái cho bé khi mặc, hình in sắc nét, đáng yêu.', 'Lụa satin', NULL, '19-11-2021'),
(37, 0, '[SIZE ĐẠI] Bộ lửng 3D dễ thương cho bé gái 10 - 16 Tuổi', 'bohoathonh3dvang.jpg', NULL, 135000, 'Set lửng 3d cho bé gái xinh yêu cute. Chất thun lạnh in 3d sắc nét, co giãn 4c mềm mịn mát- vải nhập cao cấp dày dặn mềm mạ.', 'Thun lạnh', 'còn hàng', '19-11-2021'),
(38, 0, 'Pijama ngắn cổ nơ in lừa dễ thương cho bé gái 3 - 10 Tuổi', 'pijamaluaxanh1.jpg', NULL, 100000, 'Pijama ngắn cổ nơ in lừa dễ thương cho bé gái. Nguyên bộ chất thun cotton mềm mát, co giãn. Hình in nguyên cây, cổ phối bèo nơ xinh xắn, đáng yêu.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(39, 0, 'Bộ mặt cười dễ thương cho bé gái 2 - 9 Tuổi', 'bomatcuoikingcam.jpg', NULL, 140000, 'Bộ mặt cười mặt nhà cho bé cưng xỉu. Chất vải thun cotton thoải mái cho bé khi mặt hình in sắc sảo.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(40, 0, '[SIZE ĐẠI] Bộ thun in Mickey toàn thân dễ thương cho bé gái 10 - 16 Tuổi', 'bomickeytoanthanxanh.jpg', NULL, 153000, 'Bộ đùi mặt nhà cho bé cưng xỉu. Chất vải thun cotton thoải mái cho bé khi mặt hình in sắc sảo.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(41, 0, 'Bộ thun in Mickey toàn thân dễ thương cho bé gái 2 - 9 Tuổi', 'bomickeytoanthansen2.jpg', NULL, 140000, 'Bộ đùi mặt nhà cho bé cưng xỉu. Chất vải thun cotton thoải mái cho bé khi mặt hình in sắc sảo.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(42, 0, 'Bộ lửng in gấu toàn thân dễ thương cho bé gái 2 - 9 Tuổi', 'SETLEGGINGNHIEUGAUVANG.jpg', NULL, 133000, 'Bộ lửng in gấu dễ thương mẹ và bé có thể diện chung đôi. Nguyên bộ may bằng chất thun cotton 4c mềm mịn, áo form rộng qua mông, hình in thấm toàn thân áo sắc nét. Quần form ôm.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(43, 0, '[SIZE ĐẠI] Bộ lửng in gấu toàn thân dễ thương cho bé gái 10 - 15 Tuổi', 'SETLEGGINGNHIEUGAUCAMSUA.jpg', NULL, 100000, 'Bộ lửng in gấu dễ thương mẹ và bé có thể diện chung đôi. Nguyên bộ may bằng chất thun cotton 4c mềm mịn, áo form rộng qua mông, hình in thấm toàn thân áo sắc nét. Quần form ôm.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(44, 1, '[SIZE ĐẠI] Đầm bi cổ sen dễ thương cho bé gái 10 - 15 tuổi', 'damcosenbiden.jpg', NULL, 162000, 'Đầm bi cổ sen dễ thương cho bé gái. Đơn giản, nhưng không hề đơn điệu , full màu ngọt ngào mát lịm, gái diện xuống phố đi chơi , đi học cực kì nổi bật. Đầm chất liệu lụa mango nhập , mềm mát , thiết kế tinh tế, tỉ mỉ từng đường kim mũi chỉ.', 'Lụa Mango', 'còn hàng', '19-11-2021'),
(45, 1, '[SIZE ĐẠI] Đầm tầng hoa dễ thương cho bé gái 9 - 12 tuổi', 'damtanghoado.jpg', NULL, 152000, 'Chào mẫu đầm tầng tiểu thư đáng yêu. Chất liệu kate Hàn nhập y hình , mềm mịn cực mát.', 'Kate', 'còn hàng', '19-11-2021'),
(46, 1, '[SIZE ĐẠI] Đầm đuôi cá phối bo PRINCESS dễ thương cho bé gái 10 - 16 tuổi', 'damduoicaphoibotrang2.jpg', NULL, 157000, 'Đầm đuôi cá Princess siêu dễ thương cho bé gái. Chất thun 100% cotton 4c mịn, đẹp, hình thêu, bo dệt.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(47, 1, '[SIZE ĐẠI] Đầm tầng cầu vồng in thỏ dễ thương cho bé gái 10 - 16 tuổi', 'damtangcauvong2.jpg', NULL, 155000, 'Đẹp rạng ngời mà không chói lóa là đây ạ. Đầm tầng cầu vồng siêu xinh cho bé gái ngày hè. Thiết kế tùng nối tầng xòe rộng, phối màu nổi bật, hình in sắc nét. Chất vải thun cotton 4c co giãn mềm mịn bao đẹp bảo đảm làm hài lòng các mom ạ.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(48, 2, 'Set bơi phao kèm nón MÈO dễ thương cho bé gái 2 - 12 tuổi', 'setboiphaomeo1.jpg', NULL, 268000, 'Set bơi phao kèm nón dễ thương cho bé gái 2 - 12 tuổi. Chất thun poly co giãn mạnh.', 'Poly co giãn', 'còn hàng', '19-11-2021'),
(49, 2, 'Set bơi hai mảnh kèm áo và băng đô dễ thương cho bé gái 2 - 9 tuổi', 'doboi4monden.jpg', NULL, 139000, 'Giới thiệu set bơi phom mới toanh, gồm 4 chi tiết - áo ngoài+ set bộ+ băng đô phối hợp quá đẹp, và tạo điểm nhấn siêu yêu. Chất thun thể thao coton in 3d mềm mịn, thun lạnh loai 1.', 'Thun lạnh co giãn', 'còn hàng', '19-11-2021'),
(50, 2, 'Set bơi bèo kèm nón dễ thương cho bé gái 3 - 10 tuổi', 'setboivang.jpg', NULL, 149000, 'Set bơi bèo kèm nón dễ thương cho bé gái 3 - 10 tuổi. Chất thun poly co giãn mạnh.', 'Poly co giãn', 'còn hàng', '19-11-2021'),
(51, 2, 'Set bơi liền in thỏ kèm nón bơi dễ thương cho bé gái 2 - 10 tuổi', 'SETBOITHOHONG.jpg', NULL, 225000, 'Set bơi liền in thỏ kèm nón bơi dễ thương cho bé gái 2 - 10 tuổi. Chất thun poly co giãn mạnh.', 'Poly co giãn', 'còn hàng', '19-11-2021'),
(52, 5, '[SIZE ĐẠI] Set áo thể thao N.I.K.E dễ thương cho bé trai từ 11 - 16 Tuổi', 'SETNKEXANH.jpg', NULL, 148000, 'Set thể thao phối màu NKE dễ thương cho bé trai. Nguyên bộ thun cotton 4c mềm đẹp. Phối màu kết hợp in tạo điểm nhấn.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(53, 5, '[SIZE ĐẠI] Bộ phối màu ESHASING dễ thương cho bé trai từ 10 - 15 Tuổi', 'setphoimauessvang.jpg', NULL, 150000, 'Gửi đến bé trai bộ phối EHANSNG đơn giản nhưng không kém phần cá tính. Nguyên bộ thun cotton 4c mềm đẹp. Phối vải kết hợp in tạo điểm nhấn.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(54, 5, '[SIZE ĐẠI] Bộ dài tay Jordan dễ thương cho bé từ 10 - 16 Tuổi', 'bojordan1.jpg', NULL, 175000, 'Bộ thun dài tay Jordan dễ thương cho bé trai & bé gái. Nguyên bộ thun cotton mềm mát, thấm hút mồ hôi. Hình in sắc nét không bong tróc.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(55, 5, '[SIZE ĐẠI] Bộ dài tay raplang Squid game dễ thương cho bé từ 10 - 16 Tuổi', 'squidgamedaitay.jpg', NULL, 190000, 'Bộ thun dài tay Raplang Squid game HOT TREND cho bé trai & bé gái. Nguyên bộ thun cotton mềm mát, thấm hút mồ hôi. Áo raplang, quần phối vải hai bên khỏe khoắn.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(56, 5, 'Bộ Pijama in khủng long dễ thương cho bé từ 2 - 9 Tuổi', 'pijamakhunglongxanh.jpg', NULL, 165000, 'Bộ Pizama khủng long siêu iu cho bé trai bé gái. Nguyên bộ thun cotton chính phẩm co giãn 4c. Hình in sắc nét. Cổ, lai tay và quần phối màu . 2 túi đắp gái khủng long siêu iu . Form chuẩn.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(57, 5, '[SIZE ĐẠI] Bộ nón sát nách phun sơn AWSOME dễ thương cho bé trai từ 10 - 15 Tuổi', 'setaononawesomexanh.jpg', NULL, 147000, 'Bộ thun nón sát nách phun sơn cho bé trai ngày hè. Nguyên bộ may bằng chất thun cotton 4c mềm mịn, áo form sát nách mát mẻ, thân trước in phun sơn lạ mắt, nón trùm đầu đính dây cực chất.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(58, 6, 'Set bơi gắn phao kèm nón BATMAN dễ thương cho bé trai 2 - 12 Tuổi', 'setboiphaobatmanxanh1.jpg', NULL, 268000, 'Set bơi phao kèm nón dễ thương cho bé trai. Chất thun poly co giản mạnh thoãi mái cho bé, gắn kèm phao an toàn cho những bé không biết bơi.', 'Thun poly co giãn', 'còn hàng', '19-11-2021'),
(59, 6, 'Set bơi liền quần kèm nón người nhện dễ thương cho bé trai 2 - 10 Tuổi', 'SETBOINHENKEMNONDO.jpg', NULL, 205000, 'Set bơi liền quần kèm nón người nhện cực ngầu cho bé trai. Chất thun poly co giãn mạnh, hình in sắc nét, sau may dây kéo.', 'Thun poly co giãn', 'còn hàng', '19-11-2021'),
(60, 6, 'Set áo bơi kèm quần dài tay cá mập dễ thương cho bé trai 2 - 10 Tuổi', 'SETBOICAMAPXANH.jpg', NULL, 225000, 'Set bơi dài tay cá mập cực ngầu cho bé trai. Thun poly co giản mạnh.', 'Thun poly co giãn', 'còn hàng', '19-11-2021'),
(61, 6, 'Set đồ bơi dài tay siêu nhân IRON MAN dễ thương cho bé trai 2 - 10 Tuổi', 'BOIDAITAYSIEUNHANXANH.jpg', NULL, 225000, 'Set áo bơi dài tay siêu nhân cực ngầu cho bé trai.Chất thun poly co giãn mạnh.', 'Thun poly co giãn', 'còn hàng', '19-11-2021'),
(62, 7, 'Áo thun tết in trâu dễ thương cho bé từ 2 - 9 Tuổi', 'aothuntrautetdo.jpg', NULL, 95000, 'Xuân sắp về. Chào áo Tết cho cả gia đình đón xuân vui tươi cùng trâu vàng đón tết vạn điều may. Nguyên áo được may bằng chất thun cotton 4c 100%. Hình in cao cấp bao ko bong tróc, sờ mướt tay.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(63, 7, '[SIZE ĐẠI] Áo sơ mi hươu dễ thương cho bé từ 11 - 16 Tuổi', 'aosomihuouxanh1.jpg', NULL, 168000, 'Áo sơ mi hươu dễ thương lịch lãm cho bé đi chơi ngày Lễ Tết. Chất kate cao cấp mềm mại bao đẹp.', 'Kate', 'còn hàng', '19-11-2021'),
(64, 7, '[SIZE ĐẠI] Áo hoodie Totoro dễ thương cho bé từ 10 - 16 Tuổi', 'aohoddietoronto2.jpg', 2, 135000, 'Áo HOODIE in Toronto dễ thương cho bé. Chất thun cotton 4c chính phẩm mịn đẹp và thấm mồ hôi. Hình in CAO CẤP sắc nét, bền màu, không bong dính.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(65, 7, 'Áo Hoodie Bò sữa dễ thương cho bé từ 2 - 9 Tuổi', 'aohoodiebosuavang.jpg', NULL, 120000, 'Áo hoodie bò sữa HOTTREND cho bé trai & bé gái. Áo nón phối 2 tai xin xắn chất thun cotton 4c in sắc sảo.', 'Thun cotton', 'còn hàng', '19-11-2021'),
(66, 4, 'Quần sort jeans wash rách dễ thương cho bé gái 2 - 9 Tuổi', 'quanjeanswashrach1.jpg', NULL, 152000, 'Quần jeans wash sành điệu cho bé gái. Chất jean coton mềm mại, cắt rách sành điệu. Có lót và tăng đơ phía trong nên mẹ không bao giờ sợ khó mặc và hở da hở thịt nhé.', 'Jeans', NULL, '19-11-2021'),
(73, 4, 'Quần jeans ống rộng dễ thương cho bé gái 5 - 10 Tuổi', 'quanjeanongrongnhat.jpg', NULL, 165000, 'Giới thiệu mẫu quần ống rộng sang chảnh cho hot girl. Chất jean cotton mềm mịn , thích hợp cho dạng quần ống rộng , bé mặc vừa style lại vừa thoải mái .', 'Jeans', NULL, '22-12-2021'),
(74, 4, 'Quần jeans jogger dễ thương cho bé gái 5 - 10 Tuổi', 'jeansjogger2.jpg', NULL, 150000, 'Mẫu quần jean jogger - hot trend sành điệu cho bé năng động. Quần jean thun wash mềm, co giãn thỏai mái, nút lưng cách điệu thêm xinh. Baget giả , bo thun mềm thoải mái.', 'Jeans', NULL, '22-12-2021'),
(75, 4, 'Quần jeans lệch lai dễ thương cho bé gái 2 - 9 Tuổi', 'quanjeanslechlaixanh.jpg', NULL, 152000, 'Quần Jean lệch lai - quá cưng cho bé yêu!!! Mix đồ kiểu gì cũng xinh hết nấc. Chất JEAN co giãn mạnh, mềm mại. Wash rách thời trang. Ống so le trước sau, wash tua rua cá tính và sành điệu.', 'Jeans', NULL, '22-12-2021'),
(76, 4, 'Quần sort jeans dễ thương cho bé gái', 'quansortjeanhlden.jpg', NULL, 170000, 'Quần sort jeans lưng cao dễ thương cho bé gái đi chơi. Chất liệu Jeans siêu co giãn, lưng cao, dễ phối đồ.', 'Jeans', NULL, '22-12-2021'),
(77, 4, 'Quần lửng jeans mộc dễ thương cho bé gái 2 - 9 Tuổi', 'quanlungjeanmoctrang.jpg', NULL, 147000, 'Quần Jean lửng siêu đẹp cho bé gái phối đồ. Chất jean co giãn mạnh thoải mái,lưng thun sau co giãn.', 'Jeans', NULL, '22-12-2021'),
(78, 4, 'Quần jeans bomber dễ thương cho bé gái 2 - 9 Tuổi', 'QUANBOMERTRANG.jpg', NULL, 167000, 'Jean bomber chất hơn nc cất CHO BÉ YÊU. Quá đẹp luôn ạ màu hot trend nữa k mua quần này thì phí lắm đó các ty ơi. Quần đc may trên chất liệu jean giãn mềm mại thoáng mát, tăng đơ tăng giảm trong.', 'Jeans', NULL, '22-12-2021'),
(79, 4, '[SIZE ĐẠI] Quần sort jeans B2KID dễ thương cho bé gái 9 - 15 Tuổi', 'quansortjeanb2kid3.jpg', NULL, 145000, 'Chào mẫu short jean bé gái wash rách thời trang. Chất liệu: jean thun cotton dày, mềm, co giãn mạnh. Kiểu dáng: short jean lưng thun, trang trí đơn giản, thời trang.', 'Jeans', NULL, '22-12-2021'),
(80, 4, 'Quần jeans wash túi kiểu dễ thương cho bé gái 2 - 9 Tuổi', 'quanjeantuikieu2.jpg', NULL, 160000, 'Quần jean thời trang , cá tính và năng động cho bé yêu. Chất jean mềm mại giãn mạnh. Lưng thung tạo cảm giác thoải mái cho bé khi mặc. Was cao cấp 1 màu như hình. Cực dễ mix đồ.', 'Jeans', NULL, '22-12-2021'),
(81, 4, 'Quần dài da cá BOSTON dễ thương cho bé 2 - 9 Tuổi', 'quandacabostonxam.jpg', NULL, 105000, 'Basic chưa bao giờ lỗi mốt , chất ngất quả đất cho các bé diện xuống phố đi chơi,đi học cực chất cực sang lắm luôn. Quần may trên chất liệu da cá cao cấp , mềm mịn , thoát mồi hôi,in sắc nét, bao đẹp, không bóng tróc.', 'Thun da cá', NULL, '22-12-2021'),
(82, 4, 'Quần sort jeans Mickey dễ thương cho bé gái 2 - 9 Tuổi', 'QUANSORTJEANMICKEYTRANG1.jpg', NULL, 145000, 'Hottrend cho gái xinh đổi style quần short thêu mickey . Mix triệu thể loại áo sang chảnh cực chất luôn. Quần may trên chất liệu jean quảng châu cao cấp loại 1 ,co giãn mạnh , thêu sắc nét, có tăng đơ trong.', 'Jeans', NULL, '22-12-2021'),
(83, 4, 'Quần jeans lửng thêu mặt cười dễ thương cho bé gái 2 - 9 Tuổi', 'QUANJEANLUNGMATCUOI1.jpg', NULL, 152000, 'Quần Jean lửng siêu đẹp cho bé gái. Chất jean co giãn mạnh thoải mái, hình thêu mặt cười xinh xắn cực dễ thương, lưng thun sau co giãn thoải mái cho bé khi mang.', 'Kate', NULL, '22-12-2021'),
(84, 4, 'Quần jeans Hoa cúc hạt dễ thương cho bé gái 2 - 9 Tuổi', 'setjeancroptopvang.jpg', NULL, 125000, 'Hoa cúc đang hot!!! Mẫu Sort Jean cúc họa mi kèm phụ kiện móc khoá sành điệu cho bg - Chất Jean nhập co giãn mạnh, mềm mại. Hình in hot trend. Kèm móc khoá thật xinh. Mix cùng sơ mi hoặc áo thun đều đẹp.', 'Jeans', NULL, '22-12-2021'),
(85, 4, 'Quần jeans wash rách lưng cao dễ thương cho bé gái 2 - 9 Tuổi', 'qunajeans1.jpg', NULL, 135000, 'Quần jeans wash rách lưng cao sành điệu cho bé gái đi chơi. Chất jeans co giãn mạnh thoãi mái cho bé khi mang. Quần dây kéo wash rách, lai tua rua cực bụi, may hột viền túi nổi bật, thời trang.', 'Jeans', NULL, '22-12-2021'),
(86, 8, '[SIZE ĐẠI] Quần jeans dài jogger dễ thương cho bé trai 11 - 15 tuổi', 'quanjoggertuihop1.jpg', NULL, 178000, 'Quần jeans jogger cá tính cho bé trai. Chất jeans mềm co giãn mạnh, lung thun thoãi mái cho bé khi mang.', 'Jeans', NULL, '22-12-2021'),
(87, 8, '[SIZE ĐẠI] Quần kaki lửng dễ thương cho bé trai 8 - 15 tuổi', 'quankakilungden.jpg', NULL, 144000, 'Quần kaki lửng cực chất cho bé trai. Chất kaki mộc cao cấp có giãn thoái mái cho bé khi mặc, lai phối chữ cực bụi.', 'Kaki', NULL, '22-12-2021'),
(88, 8, 'Quần kaki túi hộp khóa kéo WV89 dễ thương cho bé trai 10 - 15 tuổi', 'quankakikhoakeoxanh.jpg', NULL, 170000, 'Quần Kaki túi hộp khóa kéo cho bé trai cực chất. Chất Kaki co giãn, wash mềm. Bo ống thun mềm. Tui hộp 2 bên , 1 bên có khoá kéo.', 'Kaki', NULL, '22-12-2021'),
(89, 8, '[SIZE ĐẠI] Quần da cá túi hộp chữ X dễ thương cho bé trai 11 - 16 tuổi', 'quandacaden.jpg', NULL, 145000, 'Quần túi hộp năng động - dễ dàng kết hợp với các loại áo. Chất thun da cá dày dặn, túi hộp 2 bên. Hình in chữ X hot trend.', 'Thun da cá', NULL, '22-12-2021'),
(90, 8, 'Quần da cá túi hộp chữ X dễ thương cho bé trai 3 - 10 tuổi', 'quandacacam.jpg', NULL, 132000, 'Quần túi hộp năng động - dễ dàng kết hợp với các loại áo. Chất thun da cá dày dặn, túi hộp 2 bên. Hình in chữ X hot trend.', 'Thun da cá', NULL, '22-12-2021'),
(91, 8, 'Quần kaki mộc dễ thương cho bé trai 2 - 9 tuổi', 'quankakimocden3.jpg', NULL, 137000, 'Quần kaki thun dài cho bé trai bé gái điều bon chen mặc được. Chất liệu kaki thun chất co giãn tốt.', 'Kaki thun', NULL, '22-12-2021'),
(92, 8, 'Quần da cá in sườn dễ thương cho bé trai 2 - 9 tuổi', 'quandaca1.jpg', NULL, 100000, 'Siêu phẩm sang chảnh, Kool ngầu cho boy. Thiết kế độc lạ, phối lạ mắt, kiểu dáng thể thao, chất liệu da cá nhập, sịn sò, in chất liệu cao cấp, bao bong tróc.', 'Thun da cá', NULL, '22-12-2021'),
(93, 8, '[SIZE ĐẠI] Quần jeans mộc dễ thương cho bé trai 10 - 16 tuổi', 'jeansmocdo.jpg', NULL, 170000, 'Quần jeans mộc dễ thương cho bé đi chơi Lễ Tết. Chất jeans mềm mại bao đẹp.', 'Jeans', NULL, '22-12-2021'),
(94, 8, 'Quần jeans jogger thêu chữ dễ thương cho bé trai 2 - 9 tuổi', 'quanjeansjoggerxanh1.jpg', NULL, 155000, 'Jogger JEAN siêu ngầu cho Boy - mix đồ cực chất và sành điệu. Chất JEAN co giãn mạnh, mềm mịn. Kiểu dáng thể thao năng động. Đắp logo thời trang.', 'Jeans', NULL, '22-12-2021'),
(95, 8, 'Quần jogger sọc in chữ dễ thương cho bé trai 2 - 9 tuổi', 'qunajogerinchuxden.jpg', NULL, 110000, 'JOGGER thể thao NĂNG ĐỘNG - CÁ TÍNH cho Boy phối đồ cực chất, cực ngầu. Chất liệu: thun cotton chính phẩm co giãn 4c. Chạy dây dệt 2 bên đậm chất thể thao- sành điệu.', 'Thun cotton', NULL, '22-12-2021'),
(96, 8, 'Quần jogger phối hoa văn dễ thương cho bé trai 2 - 9 tuổi', 'QUANJOGERHOAVANVANG.jpg', NULL, 115000, 'Quần jogger phong cách cho các bé mặc mùa lạnh nhé. Chất da cá xịn, dày dặn các bé mặc trong mùa này là tuyệt vời luôn nhé.', 'Thun da cá', NULL, '22-12-2021'),
(97, 8, 'Quần jogger phối viền màu dễ thương cho bé trai 2 - 9 tuổi', 'quanjoggercamdat.jpg', NULL, 105000, 'Chào mẫu jogger thể thao năng động cho Bé trai ngày thu. Chất thun cotton chính phẩm co giãn 4c. May phối màu lạ mắt, đậm chất thể thao.', 'Jeans', NULL, '22-12-2021'),
(98, 8, 'Quần da cá jogger phối sọc dễ thương cho bé trai 2 - 9 tuổi', 'quandacaphoisocden.jpg', NULL, 105000, 'Jogger da cá - đơn giản dễ phối đồ cho bé trai, diện mùa nắng hay mưa đều tiện. Chất thun da cá loại 1, mềm mịn. Đắp túi sau cực chất. In sọc 2 bên năng động.', 'Thun cottton', NULL, '22-12-2021'),
(99, 8, 'Quần dài chân bo in chữ Yes dễ thương cho bé trai 2 - 9 Tuổi', 'quandaido.jpg', NULL, 115000, 'Quần dài bo chân cho bé trai giúp bé vừa năng động vừa lịch sự, chất liệu linen mỏng mát thích hợp cho bé diện hè. Mẹ có thể thỏa thích phối đồ cho bé cùng với áo phông trơn hay hoạt tiết hoạt hình cho con trai.', 'linen', NULL, '22-12-2021'),
(100, 8, 'Quần da cá bo cao in chữ dễ thương cho bé trai 2 - 9 Tuổi', 'QUANBOCAODEN.jpg', NULL, 105000, 'Quần da cá bo cao in chữ cực ngầu cho bé mùa thu. Chất thun da cá dầy dặn bao đẹp, vải mềm mịn, thoáng mát. Quần thiết kế bo cao, chạy viền hai bên thể thao kết hợp in chữ nổi bật.', 'Thun da cá', NULL, '22-12-2021');

-- --------------------------------------------------------

--
-- Table structure for table `sanphamct`
--

DROP TABLE IF EXISTS `sanphamct`;
CREATE TABLE IF NOT EXISTS `sanphamct` (
  `sp_id` int(11) NOT NULL AUTO_INCREMENT,
  `masp` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  PRIMARY KEY (`sp_id`),
  KEY `masp` (`masp`),
  KEY `color_id` (`color_id`),
  KEY `size_id` (`size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=369 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sanphamct`
--

INSERT INTO `sanphamct` (`sp_id`, `masp`, `color_id`, `size_id`, `soluong`) VALUES
(5, 11, 5, 10, 3),
(6, 11, 5, 11, 2),
(7, 11, 5, 12, 3),
(8, 11, 5, 13, 5),
(9, 11, 5, 14, 6),
(10, 11, 5, 15, 0),
(11, 11, 5, 16, 8),
(12, 11, 1, 10, 3),
(14, 11, 1, 12, 4),
(15, 11, 1, 13, 5),
(16, 11, 1, 14, 6),
(17, 11, 1, 15, 10),
(20, 12, 3, 2, 13),
(21, 12, 3, 3, 5),
(22, 12, 3, 4, 6),
(23, 12, 9, 4, 4),
(24, 12, 9, 5, 7),
(25, 12, 9, 6, 9),
(26, 12, 4, 3, 10),
(27, 12, 4, 4, 4),
(33, 12, 4, 5, 5),
(34, 12, 4, 6, 6),
(35, 4, 7, 10, 7),
(36, 4, 7, 12, 8),
(37, 4, 7, 15, 4),
(38, 5, 7, 11, 5),
(39, 5, 0, 10, 6),
(40, 5, 0, 15, 5),
(41, 6, 0, 10, 7),
(42, 6, 7, 11, 8),
(43, 6, 7, 15, 6),
(48, 7, 3, 5, 4),
(49, 7, 3, 8, 9),
(50, 7, 3, 12, 3),
(51, 7, 3, 15, 2),
(52, 8, 3, 10, 7),
(53, 8, 7, 10, 11),
(54, 8, 1, 10, 8),
(55, 9, 7, 2, 9),
(56, 9, 3, 7, 8),
(57, 9, 1, 4, 9),
(58, 9, 1, 5, 54),
(59, 10, 0, 10, 22),
(60, 10, 0, 11, 15),
(61, 10, 0, 13, 17),
(62, 10, 0, 15, 14),
(63, 32, 0, 2, 6),
(64, 32, 0, 5, 8),
(65, 32, 0, 6, 9),
(66, 36, 2, 5, 55),
(67, 36, 2, 6, 66),
(68, 33, 0, 2, 3),
(69, 33, 0, 4, 4),
(70, 33, 0, 6, 5),
(71, 33, 0, 9, 6),
(72, 34, 7, 2, 4),
(73, 34, 7, 5, 7),
(74, 34, 7, 9, 2),
(75, 35, 3, 2, 1),
(76, 35, 3, 5, 4),
(77, 35, 3, 9, 5),
(78, 36, 9, 10, 4),
(79, 36, 9, 13, 5),
(80, 36, 9, 15, 6),
(81, 36, 7, 10, 7),
(82, 36, 7, 14, 7),
(83, 36, 1, 10, 7),
(84, 36, 1, 15, 6),
(85, 37, 3, 10, 3),
(86, 37, 3, 14, 4),
(87, 37, 3, 16, 5),
(88, 37, 7, 10, 7),
(89, 37, 7, 15, 6),
(90, 38, 7, 3, 3),
(91, 38, 7, 5, 5),
(92, 38, 7, 6, 6),
(93, 38, 7, 9, 9),
(94, 38, 7, 10, 9),
(95, 39, 2, 2, 3),
(96, 39, 2, 4, 4),
(97, 39, 2, 6, 5),
(98, 39, 7, 7, 6),
(99, 39, 7, 9, 7),
(100, 40, 9, 10, 3),
(101, 40, 9, 14, 3),
(102, 40, 9, 16, 5),
(103, 40, 7, 11, 5),
(104, 40, 7, 12, 7),
(105, 40, 2, 13, 7),
(106, 40, 2, 12, 8),
(107, 41, 9, 2, 3),
(108, 41, 9, 4, 3),
(109, 41, 9, 6, 6),
(110, 41, 7, 8, 5),
(111, 41, 7, 9, 7),
(112, 41, 2, 5, 8),
(113, 41, 2, 3, 8),
(114, 42, 3, 2, 3),
(115, 42, 3, 3, 4),
(116, 42, 3, 7, 5),
(117, 42, 3, 9, 6),
(118, 42, 7, 2, 7),
(119, 42, 7, 4, 8),
(120, 42, 7, 6, 9),
(121, 42, 7, 9, 10),
(122, 42, 6, 2, 5),
(123, 42, 6, 5, 5),
(124, 43, 3, 12, 3),
(125, 43, 3, 13, 4),
(126, 43, 3, 14, 5),
(127, 43, 3, 15, 6),
(128, 43, 7, 10, 7),
(129, 43, 7, 12, 8),
(130, 43, 7, 13, 9),
(131, 43, 7, 15, 10),
(132, 43, 6, 11, 5),
(133, 43, 6, 14, 5),
(134, 44, 5, 10, 3),
(135, 44, 5, 12, 4),
(136, 44, 5, 13, 5),
(137, 44, 5, 15, 6),
(138, 44, 3, 12, 7),
(139, 44, 3, 14, 8),
(140, 44, 9, 11, 9),
(141, 44, 9, 13, 10),
(142, 44, 9, 15, 12),
(143, 45, 1, 9, 5),
(144, 45, 1, 10, 6),
(145, 45, 1, 11, 7),
(146, 45, 1, 12, 9),
(147, 46, 0, 10, 3),
(148, 46, 0, 12, 7),
(149, 46, 0, 13, 8),
(150, 46, 0, 14, 5),
(151, 46, 0, 15, 4),
(152, 46, 0, 16, 3),
(153, 47, 11, 10, 5),
(154, 47, 11, 11, 11),
(155, 47, 11, 12, 15),
(156, 47, 11, 13, 13),
(157, 47, 11, 15, 14),
(158, 47, 11, 16, 17),
(159, 48, 7, 2, 3),
(160, 48, 7, 4, 4),
(161, 48, 7, 6, 5),
(162, 48, 7, 8, 8),
(163, 48, 7, 10, 10),
(164, 48, 7, 12, 11),
(165, 49, 5, 2, 3),
(166, 49, 5, 5, 5),
(167, 49, 5, 9, 8),
(168, 49, 3, 3, 11),
(169, 49, 3, 4, 9),
(170, 49, 7, 6, 8),
(171, 49, 7, 7, 6),
(172, 49, 10, 8, 10),
(173, 49, 10, 9, 12),
(174, 50, 3, 3, 3),
(175, 50, 3, 5, 7),
(176, 50, 3, 8, 8),
(177, 50, 3, 10, 10),
(178, 50, 1, 4, 9),
(179, 50, 1, 6, 9),
(180, 50, 1, 8, 10),
(181, 50, 1, 10, 14),
(182, 51, 7, 2, 4),
(183, 51, 7, 4, 5),
(184, 51, 7, 6, 10),
(185, 51, 7, 7, 11),
(186, 51, 7, 9, 14),
(187, 51, 7, 10, 13),
(188, 52, 8, 11, 3),
(189, 52, 8, 13, 5),
(190, 52, 8, 15, 6),
(191, 52, 8, 16, 7),
(192, 52, 2, 11, 10),
(193, 52, 2, 13, 11),
(194, 52, 2, 14, 13),
(195, 52, 2, 16, 12),
(196, 52, 1, 11, 18),
(197, 52, 1, 13, 19),
(198, 52, 1, 15, 15),
(199, 53, 3, 10, 14),
(200, 53, 3, 12, 13),
(201, 53, 3, 14, 16),
(202, 53, 5, 10, 10),
(203, 53, 5, 13, 9),
(204, 53, 5, 15, 8),
(205, 54, 0, 10, 11),
(206, 54, 0, 13, 14),
(207, 54, 0, 16, 15),
(208, 55, 8, 10, 3),
(209, 55, 8, 12, 3),
(210, 55, 8, 14, 3),
(211, 55, 8, 16, 3),
(212, 56, 12, 2, 10),
(213, 56, 12, 9, 11),
(214, 57, 9, 10, 10),
(215, 57, 9, 12, 11),
(216, 57, 9, 14, 13),
(217, 57, 9, 15, 15),
(218, 58, 9, 2, 6),
(219, 58, 9, 5, 4),
(220, 58, 9, 8, 10),
(221, 58, 9, 12, 15),
(222, 59, 1, 2, 10),
(223, 59, 1, 5, 10),
(224, 59, 1, 10, 11),
(225, 60, 12, 2, 10),
(226, 60, 12, 6, 15),
(227, 60, 12, 10, 14),
(228, 61, 9, 2, 10),
(229, 61, 9, 10, 15),
(230, 62, 1, 2, 20),
(231, 62, 1, 5, 22),
(232, 62, 1, 9, 15),
(233, 62, 3, 3, 18),
(234, 62, 3, 5, 16),
(235, 62, 3, 9, 21),
(236, 63, 12, 11, 10),
(237, 63, 12, 13, 10),
(238, 63, 12, 16, 10),
(239, 64, 0, 10, 11),
(240, 64, 0, 16, 11),
(241, 64, 3, 10, 13),
(242, 64, 3, 13, 15),
(243, 64, 3, 16, 18),
(244, 65, 3, 2, 10),
(245, 65, 3, 5, 11),
(246, 65, 3, 9, 10),
(247, 66, 12, 2, 5),
(248, 66, 12, 5, 4),
(249, 66, 12, 9, 3),
(250, 73, 12, 5, 6),
(251, 73, 12, 7, 8),
(252, 73, 12, 10, 9),
(253, 74, 12, 5, 5),
(254, 74, 12, 8, 7),
(255, 74, 12, 10, 9),
(256, 75, 12, 2, 4),
(257, 75, 12, 6, 5),
(258, 75, 12, 9, 7),
(259, 75, 5, 2, 4),
(260, 75, 5, 5, 5),
(261, 75, 5, 7, 6),
(262, 75, 5, 10, 9),
(263, 76, 5, 3, 5),
(264, 76, 5, 5, 5),
(265, 76, 5, 7, 5),
(266, 76, 0, 4, 5),
(267, 76, 0, 6, 5),
(268, 76, 0, 8, 6),
(269, 77, 0, 2, 4),
(270, 77, 0, 4, 4),
(271, 77, 0, 6, 5),
(272, 77, 0, 9, 5),
(273, 77, 5, 2, 6),
(274, 77, 5, 6, 6),
(275, 77, 5, 9, 6),
(276, 78, 0, 2, 4),
(277, 78, 0, 4, 5),
(278, 78, 0, 6, 6),
(279, 78, 0, 9, 7),
(280, 79, 12, 9, 6),
(281, 79, 12, 12, 6),
(282, 79, 12, 15, 7),
(283, 80, 12, 2, 5),
(284, 80, 12, 6, 5),
(285, 80, 12, 9, 5),
(287, 81, 4, 2, 5),
(288, 81, 4, 5, 5),
(289, 81, 4, 9, 7),
(290, 81, 8, 3, 6),
(291, 81, 8, 7, 4),
(292, 81, 8, 9, 3),
(293, 82, 0, 2, 3),
(294, 82, 0, 6, 2),
(295, 82, 0, 9, 5),
(296, 83, 12, 2, 4),
(297, 83, 12, 4, 6),
(298, 83, 12, 9, 4),
(299, 84, 3, 2, 5),
(300, 84, 3, 4, 6),
(301, 84, 3, 7, 7),
(302, 84, 3, 9, 4),
(303, 85, 12, 2, 6),
(304, 85, 12, 5, 5),
(305, 85, 12, 7, 5),
(306, 85, 12, 9, 4),
(307, 86, 12, 11, 6),
(308, 86, 12, 15, 6),
(309, 87, 5, 8, 7),
(310, 87, 5, 10, 7),
(311, 87, 5, 12, 7),
(312, 87, 5, 15, 7),
(313, 88, 8, 10, 7),
(314, 88, 8, 12, 6),
(315, 88, 8, 15, 6),
(316, 89, 5, 11, 4),
(317, 89, 5, 13, 4),
(318, 89, 5, 16, 5),
(319, 90, 2, 3, 5),
(320, 90, 2, 5, 6),
(321, 90, 2, 7, 5),
(322, 90, 2, 10, 6),
(323, 91, 5, 2, 6),
(324, 91, 5, 4, 5),
(325, 91, 5, 8, 4),
(326, 91, 0, 2, 5),
(327, 91, 0, 6, 5),
(328, 91, 0, 9, 7),
(329, 92, 4, 2, 6),
(330, 92, 4, 9, 1),
(331, 93, 1, 10, 8),
(332, 93, 1, 12, 7),
(333, 93, 1, 14, 5),
(334, 93, 1, 16, 9),
(335, 94, 12, 2, 6),
(336, 94, 12, 5, 5),
(337, 94, 12, 9, 7),
(338, 95, 3, 3, 5),
(339, 95, 3, 6, 6),
(340, 95, 4, 2, 7),
(341, 95, 4, 8, 7),
(342, 95, 5, 4, 5),
(343, 95, 5, 7, 8),
(344, 96, 3, 3, 8),
(345, 96, 3, 6, 8),
(346, 96, 9, 2, 8),
(347, 96, 9, 9, 9),
(348, 97, 2, 2, 7),
(349, 97, 2, 6, 4),
(350, 97, 5, 2, 6),
(351, 97, 5, 6, 6),
(352, 97, 5, 9, 9),
(353, 98, 5, 2, 5),
(354, 98, 5, 4, 9),
(355, 98, 4, 6, 9),
(356, 98, 4, 8, 9),
(357, 98, 4, 9, 3),
(358, 99, 0, 7, 7),
(359, 99, 0, 9, 8),
(360, 99, 10, 2, 8),
(361, 99, 10, 5, 8),
(362, 99, 10, 9, 8),
(363, 100, 5, 3, 7),
(364, 100, 5, 6, 7),
(365, 100, 5, 9, 7),
(366, 100, 4, 2, 9),
(367, 100, 4, 5, 8),
(368, 100, 4, 8, 8);

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
CREATE TABLE IF NOT EXISTS `sizes` (
  `size_id` int(11) NOT NULL AUTO_INCREMENT,
  `size` varchar(50) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`size_id`, `size`, `title`) VALUES
(2, 'Size 2', '9kg - 11kg'),
(3, 'Size 3', '11kg - 13kg'),
(4, 'Size 4', '13kg - 14kg'),
(5, 'Size 5', '14kg - 16kg'),
(6, 'Size 6', '16kg - 18kg'),
(7, 'Size 7', '18kg - 19kg'),
(8, 'Size 8', '19kg - 22kg'),
(9, 'Size 9', '22kg - 25kg'),
(10, 'Size 10', '25kg - 27kg'),
(11, 'Size 11', '27kg - 30kg'),
(12, 'Size 12', '30kg - 33kg'),
(13, 'Size 13', '9kg - 11kg'),
(14, 'Size 14', '35kg - 38kg'),
(15, 'Size 15', '38kg - 40kg'),
(16, 'Size 16', '40kg - 43kg');

-- --------------------------------------------------------

--
-- Table structure for table `users_image`
--

DROP TABLE IF EXISTS `users_image`;
CREATE TABLE IF NOT EXISTS `users_image` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `mob_no` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_image`
--

INSERT INTO `users_image` (`id`, `first_name`, `last_name`, `image`, `mob_no`, `user_name`, `password`) VALUES
(15, 'Pham Nguyen', 'Nhan_DH51704887', 'chat-doc-mau-da-cam-la-gi-0.jpg', 123645897, 'nhanadmin', 'abcd1234');

-- --------------------------------------------------------

--
-- Table structure for table `ykien_kh`
--

DROP TABLE IF EXISTS `ykien_kh`;
CREATE TABLE IF NOT EXISTS `ykien_kh` (
  `STT` int(11) NOT NULL AUTO_INCREMENT,
  `HoTen` varchar(50) DEFAULT NULL,
  `TieuDe` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `DiaChi` varchar(50) DEFAULT NULL,
  `SDT` varchar(20) DEFAULT NULL,
  `NgayLH` datetime DEFAULT NULL,
  `YKien` text NOT NULL,
  `TraLoi` bit(1) DEFAULT NULL,
  PRIMARY KEY (`STT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `anhct`
--
ALTER TABLE `anhct`
  ADD CONSTRAINT `anhct_ibfk_1` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`);

--
-- Constraints for table `chitiethd`
--
ALTER TABLE `chitiethd`
  ADD CONSTRAINT `chitiethd_ibfk_1` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`MaSP`),
  ADD CONSTRAINT `chitiethd_ibfk_2` FOREIGN KEY (`mahd`) REFERENCES `hoadon` (`mahd`);

--
-- Constraints for table `giamgia`
--
ALTER TABLE `giamgia`
  ADD CONSTRAINT `giamgia_ibfk_1` FOREIGN KEY (`makm`) REFERENCES `sanpham` (`MaSP`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`MaKH`);

--
-- Constraints for table `loaisp`
--
ALTER TABLE `loaisp`
  ADD CONSTRAINT `loaisp_ibfk_1` FOREIGN KEY (`MaDM`) REFERENCES `danhmuc` (`MaDM`);

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`MaLoai`) REFERENCES `loaisp` (`MaLoai`);

--
-- Constraints for table `sanphamct`
--
ALTER TABLE `sanphamct`
  ADD CONSTRAINT `sanphamct_ibfk_1` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`MaSP`),
  ADD CONSTRAINT `sanphamct_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`color_id`),
  ADD CONSTRAINT `sanphamct_ibfk_3` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`size_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
