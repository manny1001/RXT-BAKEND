-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: myapp
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `checkout`
--

DROP TABLE IF EXISTS `checkout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkout` (
  `_id` varchar(255) NOT NULL,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `payment_method_types` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `unit_amount` varchar(255) DEFAULT NULL,
  `mode` varchar(255) DEFAULT NULL,
  `success_url` varchar(255) DEFAULT NULL,
  `cancel_url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkout`
--

LOCK TABLES `checkout` WRITE;
/*!40000 ALTER TABLE `checkout` DISABLE KEYS */;
/*!40000 ALTER TABLE `checkout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver` (
  `_id` int NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `cellphone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `homeaddress` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `acceptedtcs` varchar(255) DEFAULT NULL,
  `totalrequests` varchar(255) DEFAULT NULL,
  `registration` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES (2,'b77f5fe1-ea49-4529-84f8-b0087597d85c','Emmanuel','Nsanga','0658987378','Emmanuelmuya@gmail.com','Online','22 Somewhere','https://picsum.photos/200','1',NULL,'CF76YUGP','Ferrari','Male','2022-01-31 12:00:54','2022-03-14 08:41:25');
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `uuidtrip` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'WHere you at boet',NULL,NULL,'e65ac215-5272-4acc-b173-d0117757f31b','56468fbb-9e76-4859-a8e1-2de24223c8ce','2022-02-21 21:09:44','2022-02-21 21:09:44');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trips` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuidTrip` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `uuidUser` varchar(255) DEFAULT NULL,
  `cellphone` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `totalAmount` varchar(255) DEFAULT NULL,
  `tip` varchar(255) DEFAULT NULL,
  `paymentmethod` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `driversLiveLocation` varchar(255) DEFAULT NULL,
  `drivername` varchar(255) DEFAULT NULL,
  `uuidDriver` varchar(255) DEFAULT NULL,
  `driversCellphone` varchar(255) DEFAULT NULL,
  `driverImage` varchar(255) DEFAULT NULL,
  `driversurname` varchar(255) DEFAULT NULL,
  `driverregistration` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `driverduration` varchar(255) DEFAULT NULL,
  `driverremainingtime` varchar(255) DEFAULT NULL,
  `drivercustomerarrivaltime` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` VALUES (10,'33162651-e808-4f15-b414-11947f72c905','Emmanuel','b2fc8a80-d56f-4ce2-8c61-3ea0506c82e8','0658987378',NULL,NULL,NULL,NULL,NULL,'Pending Payment',NULL,NULL,NULL,'b77f5fe1-ea49-4529-84f8-b0087597d85c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-03-23 13:39:16','2023-03-23 14:28:28');
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `cellphone` varchar(255) DEFAULT NULL,
  `homeaddress` varchar(255) DEFAULT NULL,
  `workaddress` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `acceptedtcs` varchar(255) DEFAULT NULL,
  `totalrequests` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'b2fc8a80-d56f-4ce2-8c61-3ea0506c82e8','Emmanuel','emmanuelmuya@gmail.com',NULL,'0658987378',NULL,NULL,NULL,NULL,NULL,'2022-03-10 07:25:19','2023-03-23 11:22:58');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-28 16:34:57
