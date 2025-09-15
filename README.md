# APPIntern

File pom.xml ở backend và file .env ở frontend up lên trên github nên chỉ cần tải về là chạy được

Database:
-- MySQL dump 10.13 Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1 Database: postapp

---

-- Server version 8.0.40

/_!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT _/;
/_!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS _/;
/_!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION _/;
/_!50503 SET NAMES utf8 _/;
/_!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE _/;
/_!40103 SET TIME_ZONE='+00:00' _/;
/_!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 _/;
/_!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 _/;
/_!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' _/;
/_!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 _/;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `posts` (
`id` bigint NOT NULL AUTO*INCREMENT,
`content` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` datetime(6) NOT NULL,
`title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
`updated_at` datetime(6) NOT NULL,
`author_id` bigint NOT NULL,
PRIMARY KEY (`id`),
KEY `FK6xvn0811tkyo3nfjk2xvqx6ns` (`author_id`),
CONSTRAINT `FK6xvn0811tkyo3nfjk2xvqx6ns` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character*set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/_!40000 ALTER TABLE `posts` DISABLE KEYS _/;
INSERT INTO `posts` VALUES (2,'1234356','2025-09-12 09:50:18.471133','123','2025-09-12 10:10:11.942960',6);
/_!40000 ALTER TABLE `posts` ENABLE KEYS _/;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `users` (
`id` bigint NOT NULL AUTO*INCREMENT,
`password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character*set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/_!40000 ALTER TABLE `users` DISABLE KEYS _/;
INSERT INTO `users` VALUES (1,'$2a$10$rfFPJhHM2MqWqjXOB2zt2.eOjDfqpXRI1ohiUrw8gsF55ciT87GLS','USER','Present111'),(2,'$2a$10$eeiLaKj1gYNA.Y/JFRHiJOPIJeMsmDy/h0S2iXt./DWVEu7aGhSuO','USER','present'),(3,'$2a$10$/omw1Xf3R0XsZAiS2nwHte2os8l6HC38BOpTd/UbysugXPTrDjcBK','USER','phuc'),(4,'$2a$10$resZNNOJ7RqHVcGW0Iz0DuAKAGCPftsh8.pZ3u1oa6TzgFYEwxvca','USER','phuclequang'),(5,'$2a$10$I0nlGHtjtr/2IvIs5isMKOoxIVthiUD8TEpDyTFHeObOAz6ABEWIy','USER','viet'),(6,'$2a$10$wVfo5fQzqDBVBOEBUVhpzeb2Gd5Yg6oeUeIQ8Rpi9DljoDi7FJzc.','USER','viet1'),(7,'$2a$10$ODOfgotGC5So57UzwRJwv.1q2xSahZRqY4X3r8j7G9S4FsdUSmazS','USER','viet2');
/_!40000 ALTER TABLE `users` ENABLE KEYS _/;
UNLOCK TABLES;
/_!40103 SET TIME_ZONE=@OLD_TIME_ZONE _/;

/_!40101 SET SQL_MODE=@OLD_SQL_MODE _/;
/_!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS _/;
/_!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS _/;
/_!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT _/;
/_!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS _/;
/_!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION _/;
/_!40111 SET SQL_NOTES=@OLD_SQL_NOTES _/;

-- Dump completed on 2025-09-12 17:10:53

🚀 Hướng dẫn chạy dự án
0) Yêu cầu môi trường

JDK 17+

Node.js 18+ (hoặc mới hơn)

MySQL 8.0+

Công cụ gợi ý: IntelliJ IDEA (BE), VS Code (FE), MySQL Workbench (Database)

1) Chạy Backend (Spring Boot)
Terminal

Linux / macOS

cd backend
./mvnw spring-boot:run


Windows

cd backend
mvnw.cmd spring-boot:run

IntelliJ IDEA

Mở thư mục backend dưới dạng Maven Project

Nhấn nút Run ▶️ trong IntelliJ hoặc chạy từ Maven Tool Window

Mặc định chạy tại http://localhost:8080

2) Chạy Frontend (Vite + React)
cd frontend
npm install
npm run dev


Mặc định chạy tại http://localhost:5173

Đổi sang port 3000:

npm run dev -- --port 3000

3) Kiểm tra

Mở trình duyệt tại FE URL (5173 hoặc 3000)

FE sẽ gọi BE tại http://localhost:8080 (theo cấu hình .env)

Đăng nhập hoặc tạo bài viết để test luồng end-to-end

4) Công cụ gợi ý

Backend: IntelliJ IDEA

Frontend: VS Code

Database: MySQL Workbench


