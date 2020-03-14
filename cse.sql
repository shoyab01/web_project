-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: sample
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `answer_id` int(11) NOT NULL,
  `answer` varchar(15000) NOT NULL,
  `username` varchar(25) NOT NULL,
  `adate` datetime NOT NULL,
  KEY `answer_id` (`answer_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`answer_id`) REFERENCES `questions` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(15000) NOT NULL,
  `username` varchar(25) NOT NULL,
  `title` varchar(255) NOT NULL,
  `qdate` datetime NOT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useraccounts`
--

DROP TABLE IF EXISTS `useraccounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useraccounts` (
  `email` varchar(25) NOT NULL,
  `username` varchar(25) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccounts`
--

LOCK TABLES `useraccounts` WRITE;
/*!40000 ALTER TABLE `useraccounts` DISABLE KEYS */;
INSERT INTO `useraccounts` VALUES ('coe17b001@iiitk.ac.in','',''),('coe17b002@iiitk.ac.in','',''),('coe17b003@iiitk.ac.in','',''),('coe17b004@iiitk.ac.in','',''),('coe17b006@iiitk.ac.in','',''),('coe17b007@iiitk.ac.in','',''),('coe17b008@iiitk.ac.in','',''),('coe17b009@iiitk.ac.in','',''),('coe17b010@iiitk.ac.in','',''),('coe17b011@iiitk.ac.in','',''),('coe17b012@iiitk.ac.in','',''),('coe17b013@iiitk.ac.in','',''),('coe17b014@iiitk.ac.in','',''),('coe17b015@iiitk.ac.in','',''),('coe17b017@iiitk.ac.in','',''),('coe17b018@iiitk.ac.in','',''),('coe17b019@iiitk.ac.in','',''),('coe17b020@iiitk.ac.in','',''),('coe17b021@iiitk.ac.in','',''),('coe17b022@iiitk.ac.in','',''),('coe17b023@iiitk.ac.in','',''),('coe17b024@iiitk.ac.in','',''),('coe17b025@iiitk.ac.in','',''),('coe17b026@iiitk.ac.in','',''),('coe17b027@iiitk.ac.in','',''),('coe17b028@iiitk.ac.in','',''),('coe17b030@iiitk.ac.in','',''),('coe17b031@iiitk.ac.in','',''),('coe17b032@iiitk.ac.in','',''),('coe17b033@iiitk.ac.in','',''),('coe17b034@iiitk.ac.in','',''),('coe17b035@iiitk.ac.in','',''),('coe17b036@iiitk.ac.in','',''),('coe17b037@iiitk.ac.in','',''),('coe17b038@iiitk.ac.in','',''),('coe17b039@iiitk.ac.in','',''),('coe17b040@iiitk.ac.in','',''),('coe17b041@iiitk.ac.in','',''),('coe18b001@iiitk.ac.in','',''),('coe18b002@iiitk.ac.in','',''),('coe18b003@iiitk.ac.in','',''),('coe18b004@iiitk.ac.in','',''),('coe18b005@iiitk.ac.in','',''),('coe18b006@iiitk.ac.in','',''),('coe18b007@iiitk.ac.in','',''),('coe18b009@iiitk.ac.in','',''),('coe18b010@iiitk.ac.in','',''),('coe18b011@iiitk.ac.in','',''),('coe18b012@iiitk.ac.in','',''),('coe18b013@iiitk.ac.in','',''),('coe18b014@iiitk.ac.in','',''),('coe18b015@iiitk.ac.in','',''),('coe18b016@iiitk.ac.in','',''),('coe18b017@iiitk.ac.in','',''),('coe18b018@iiitk.ac.in','',''),('coe18b019@iiitk.ac.in','',''),('coe18b020@iiitk.ac.in','',''),('coe18b021@iiitk.ac.in','',''),('coe18b022@iiitk.ac.in','',''),('coe18b023@iiitk.ac.in','',''),('coe18b024@iiitk.ac.in','',''),('coe18b025@iiitk.ac.in','',''),('coe18b026@iiitk.ac.in','',''),('coe18b027@iiitk.ac.in','',''),('coe18b028@iiitk.ac.in','',''),('coe18b029@iiitk.ac.in','',''),('coe18b030@iiitk.ac.in','',''),('coe18b031@iiitk.ac.in','',''),('coe18b032@iiitk.ac.in','',''),('coe18b033@iiitk.ac.in','',''),('coe18b034@iiitk.ac.in','',''),('coe18b035@iiitk.ac.in','',''),('coe18b036@iiitk.ac.in','',''),('coe18b037@iiitk.ac.in','',''),('coe18b038@iiitk.ac.in','',''),('coe18b039@iiitk.ac.in','',''),('coe18b040@iiitk.ac.in','',''),('coe18b042@iiitk.ac.in','',''),('coe18b043@iiitk.ac.in','',''),('coe18b044@iiitk.ac.in','',''),('coe19b001@iiitk.ac.in','',''),('coe19b002@iiitk.ac.in','',''),('coe19b003@iiitk.ac.in','',''),('coe19b004@iiitk.ac.in','',''),('coe19b005@iiitk.ac.in','',''),('coe19b006@iiitk.ac.in','',''),('coe19b007@iiitk.ac.in','',''),('coe19b008@iiitk.ac.in','',''),('coe19b009@iiitk.ac.in','',''),('coe19b010@iiitk.ac.in','',''),('coe19b011@iiitk.ac.in','',''),('coe19b012@iiitk.ac.in','',''),('coe19b013@iiitk.ac.in','',''),('coe19b014@iiitk.ac.in','',''),('coe19b015@iiitk.ac.in','',''),('coe19b016@iiitk.ac.in','',''),('coe19b017@iiitk.ac.in','',''),('coe19b018@iiitk.ac.in','',''),('coe19b019@iiitk.ac.in','',''),('coe19b020@iiitk.ac.in','',''),('coe19b021@iiitk.ac.in','',''),('coe19b022@iiitk.ac.in','',''),('coe19b023@iiitk.ac.in','',''),('coe19b024@iiitk.ac.in','',''),('coe19b025@iiitk.ac.in','',''),('coe19b026@iiitk.ac.in','',''),('coe19b027@iiitk.ac.in','',''),('coe19b028@iiitk.ac.in','',''),('coe19b029@iiitk.ac.in','',''),('coe19b030@iiitk.ac.in','',''),('coe19b031@iiitk.ac.in','',''),('coe19b032@iiitk.ac.in','',''),('coe19b033@iiitk.ac.in','',''),('coe19b034@iiitk.ac.in','',''),('coe19b035@iiitk.ac.in','',''),('coe19b036@iiitk.ac.in','',''),('coe19b037@iiitk.ac.in','',''),('coe19b038@iiitk.ac.in','',''),('coe19b039@iiitk.ac.in','',''),('coe19b040@iiitk.ac.in','',''),('coe19b041@iiitk.ac.in','',''),('coe19b042@iiitk.ac.in','',''),('coe19b043@iiitk.ac.in','',''),('coe19b044@iiitk.ac.in','',''),('coe19b045@iiitk.ac.in','',''),('coe19b046@iiitk.ac.in','',''),('coe19b047@iiitk.ac.in','',''),('edm18b041@iiitk.ac.in','','');
/*!40000 ALTER TABLE `useraccounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-12 16:19:28
