-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: SIFAP
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `contactId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `addres` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `fiscalId` varchar(255) NOT NULL,
  `ficalAct` enum('PM','PF','ONG') NOT NULL COMMENT '"PM=PersonaMoral, \nPF=PersonaFísica, \nONG=ONG"',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int NOT NULL,
  PRIMARY KEY (`contactId`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `contact_user_idx` (`userId`),
  CONSTRAINT `contacts_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiscalActivities`
--

DROP TABLE IF EXISTS `fiscalActivities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiscalActivities` (
  `fiscalActivitiesId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`fiscalActivitiesId`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiscalActivities`
--

LOCK TABLES `fiscalActivities` WRITE;
/*!40000 ALTER TABLE `fiscalActivities` DISABLE KEYS */;
/*!40000 ALTER TABLE `fiscalActivities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(12,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`productId`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productTaxReceipt`
--

DROP TABLE IF EXISTS `productTaxReceipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productTaxReceipt` (
  `productTaxReceiptId` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `TaxReceiptId` int NOT NULL,
  PRIMARY KEY (`productTaxReceiptId`),
  KEY `productTaxes_products_idx` (`productId`),
  KEY `productTaxes_receipts_idx` (`TaxReceiptId`),
  CONSTRAINT `productTaxes_products` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON UPDATE CASCADE,
  CONSTRAINT `productTaxes_receipts` FOREIGN KEY (`TaxReceiptId`) REFERENCES `taxReceipt` (`taxReceiptId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productTaxReceipt`
--

LOCK TABLES `productTaxReceipt` WRITE;
/*!40000 ALTER TABLE `productTaxReceipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `productTaxReceipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `rolId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`rolId`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taxReceipt`
--

DROP TABLE IF EXISTS `taxReceipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taxReceipt` (
  `taxReceiptId` int NOT NULL AUTO_INCREMENT,
  `logo` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `organizationName` varchar(255) NOT NULL,
  `userFirstName` varchar(255) NOT NULL,
  `userLastName` varchar(255) NOT NULL,
  `userFiscalId` varchar(255) NOT NULL,
  `userDigitalSing` text,
  `userPhoneNumber` varchar(24) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userAddress` varchar(255) NOT NULL,
  `contactFisrtName` varchar(255) NOT NULL,
  `contactLastName` varchar(255) NOT NULL,
  `contactFiscalId` varchar(255) NOT NULL,
  `contactEmail` varchar(255) NOT NULL,
  `contactFiscalAct` varchar(255) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productDescription` text,
  `productQuantity` int NOT NULL,
  `productPrice` decimal(12,2) NOT NULL,
  `taxes` decimal(12,2) NOT NULL,
  `currency` char(3) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `total` decimal(12,2) NOT NULL,
  `methodPayment` enum('CR','CH') DEFAULT NULL COMMENT 'CR=Credit\nCH=Cash',
  `productId` int NOT NULL,
  `userId` int NOT NULL,
  `contactId` int NOT NULL,
  `templateId` int NOT NULL,
  PRIMARY KEY (`taxReceiptId`),
  UNIQUE KEY `userFiscalId_UNIQUE` (`userFiscalId`),
  UNIQUE KEY `userPhoneNumber_UNIQUE` (`userPhoneNumber`),
  UNIQUE KEY `userEmail_UNIQUE` (`userEmail`),
  UNIQUE KEY `contectFiscalId_UNIQUE` (`contactFiscalId`),
  UNIQUE KEY `contactEmail_UNIQUE` (`contactEmail`),
  KEY `taxReceipts_users_idx` (`userId`),
  KEY `taxReceipts_contacts_idx` (`contactId`),
  KEY `taxReceipts_templates_idx` (`templateId`),
  CONSTRAINT `taxReceipts_contacts` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`contactId`) ON UPDATE CASCADE,
  CONSTRAINT `taxReceipts_templates` FOREIGN KEY (`templateId`) REFERENCES `templates` (`templateId`) ON UPDATE CASCADE,
  CONSTRAINT `taxReceipts_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxReceipt`
--

LOCK TABLES `taxReceipt` WRITE;
/*!40000 ALTER TABLE `taxReceipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `taxReceipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templates` (
  `templateId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`templateId`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(24) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `taxReceiptLimit` int(10) unsigned zerofill NOT NULL,
  `fiscalId` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('SA','A','U') NOT NULL COMMENT 'SA= SUPERADMIN \nA = ADMIN\nU = USER\n',
  `fiscalAct` enum('PM','PF','ONG') NOT NULL COMMENT 'PM= PersonaMoral\nPF=PersonaFisica\nONG=ONG',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phoneNumber_UNIQUE` (`phoneNumber`),
  UNIQUE KEY `fiscalId_UNIQUE` (`fiscalId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-14 22:05:00
