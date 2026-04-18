-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: optistyle_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `id_stock` int NOT NULL AUTO_INCREMENT,
  `couleur` varchar(255) NOT NULL,
  `quantite` int NOT NULL,
  `taille` varchar(255) NOT NULL,
  `id_produit` int NOT NULL,
  PRIMARY KEY (`id_stock`),
  KEY `FKoc36vhukmkqufp4qm8nneysq2` (`id_produit`),
  CONSTRAINT `FKoc36vhukmkqufp4qm8nneysq2` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id_produit`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (1,'Noir',12,'M',1),(2,'Marron',8,'L',1),(3,'Noir',12,'M',2),(4,'Marron',8,'L',2),(5,'Noir',12,'M',3),(6,'Marron',8,'L',3),(7,'Noir',12,'M',4),(8,'Marron',8,'L',4),(9,'Noir',12,'M',5),(10,'Marron',8,'L',5),(11,'Noir',12,'M',6),(12,'Marron',8,'L',6),(13,'Noir',12,'M',7),(14,'Marron',8,'L',7),(15,'Noir',12,'M',8),(16,'Marron',8,'L',8),(17,'Noir',12,'M',9),(18,'Marron',8,'L',9),(19,'Noir',12,'M',10),(20,'Marron',8,'L',10),(21,'Noir',12,'M',11),(22,'Marron',8,'L',11),(23,'Noir',12,'M',12),(24,'Marron',8,'L',12),(25,'Noir',12,'M',13),(26,'Marron',8,'L',13),(27,'Noir',12,'M',14),(28,'Marron',8,'L',14),(29,'Noir',12,'M',15),(30,'Marron',8,'L',15),(31,'Noir',12,'M',16),(32,'Marron',8,'L',16),(33,'Noir',12,'M',17),(34,'Marron',8,'L',17),(35,'Noir',12,'M',18),(36,'Marron',8,'L',18),(37,'Noir',12,'M',19),(38,'Marron',8,'L',19),(39,'Noir',12,'M',20),(40,'Marron',8,'L',20),(41,'Noir',12,'M',21),(42,'Marron',8,'L',21),(43,'Noir',12,'M',22),(44,'Marron',8,'L',22),(45,'Noir',12,'M',23),(46,'Marron',8,'L',23),(47,'Noir',12,'M',24),(48,'Marron',8,'L',24),(49,'Noir',12,'M',25),(50,'Marron',8,'L',25),(51,'Noir',12,'M',26),(52,'Marron',8,'L',26),(53,'Noir',12,'M',27),(54,'Marron',8,'L',27),(55,'Noir',12,'M',28),(56,'Marron',8,'L',28),(57,'Noir',12,'M',29),(58,'Marron',8,'L',29),(59,'Noir',12,'M',30),(60,'Marron',8,'L',30),(61,'Noir',12,'M',31),(62,'Marron',8,'L',31),(63,'Noir',12,'M',32),(64,'Marron',8,'L',32),(65,'Noir',12,'M',33),(66,'Marron',8,'L',33),(67,'Noir',12,'M',34),(68,'Marron',8,'L',34),(69,'Noir',12,'M',35),(70,'Marron',8,'L',35),(71,'Noir',12,'M',36),(72,'Marron',8,'L',36),(73,'Noir',12,'M',37),(74,'Marron',8,'L',37),(75,'Noir',12,'M',38),(76,'Marron',8,'L',38),(77,'Noir',12,'M',39),(78,'Marron',8,'L',39),(79,'Noir',12,'M',40),(80,'Marron',8,'L',40),(81,'Noir',12,'M',41),(82,'Marron',8,'L',41),(83,'Noir',12,'M',42),(84,'Marron',8,'L',42),(85,'Noir',12,'M',43),(86,'Marron',8,'L',43),(87,'Noir',12,'M',44),(88,'Marron',8,'L',44),(89,'Noir',12,'M',45),(90,'Marron',8,'L',45),(91,'Noir',12,'M',46),(92,'Marron',8,'L',46),(93,'Noir',12,'M',47),(94,'Marron',8,'L',47),(95,'Noir',12,'M',48),(96,'Marron',8,'L',48),(97,'Noir',12,'M',49),(98,'Marron',8,'L',49),(99,'Noir',12,'M',50),(100,'Marron',8,'L',50),(101,'Noir',12,'M',51),(102,'Marron',8,'L',51),(103,'Noir',12,'M',52),(104,'Marron',8,'L',52),(105,'Noir',12,'M',53),(106,'Marron',8,'L',53),(107,'Noir',12,'M',54),(108,'Marron',8,'L',54),(109,'Noir',12,'M',55),(110,'Marron',8,'L',55),(111,'Noir',12,'M',56),(112,'Marron',8,'L',56),(113,'Noir',12,'M',57),(114,'Marron',8,'L',57),(115,'Noir',12,'M',58),(116,'Marron',8,'L',58),(117,'Noir',12,'M',59),(118,'Marron',8,'L',59),(119,'Noir',12,'M',60),(120,'Marron',8,'L',60),(121,'Noir',12,'M',61),(122,'Marron',8,'L',61),(123,'Noir',12,'M',62),(124,'Marron',8,'L',62),(125,'Noir',12,'M',63),(126,'Marron',8,'L',63),(127,'Noir',12,'M',64),(128,'Marron',8,'L',64),(129,'Noir',12,'M',65),(130,'Marron',8,'L',65);
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-05 21:12:51
