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
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateurs` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `date_inscription` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `role` enum('ADMIN','ACHETEUR','VENDEUR') NOT NULL,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `UK_6ldvumu3hqvnmmxy1b6lsxwqy` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (1,'2026-04-05','admin@optistyle.com','$2a$10$ZpKIAVjDGvke6mMSoEVqheIZfeEXGAvPAwACv2ulY8kbjQ1L/m.Lm','Admin','Super','ADMIN'),(2,'2026-04-05','vendor1@optistyle.com','$2a$10$.8dVQJYBasVajwmC3BF.V.ZfXwZyXy1o6GR7BtVAHv3qi24UI8orG','Pro','Vision','VENDEUR'),(3,'2026-04-05','vendor2@optistyle.com','$2a$10$L20NQC8c2vUsXhmr0cXMBO2Bi9juwfgIPM3.IP4muMOs18uM2I1nm','Optic','Lux','VENDEUR'),(4,'2026-04-05','acheteur1@optistyle.com','$2a$10$.0.SVWwbVS6w1T1IhaoHwuJjqO/0iGMNbHHgvM9DDLElNb7ABf.v6','Acheteur','Un','ACHETEUR'),(5,'2026-04-05','acheteur2@optistyle.com','$2a$10$k2cJDXCMz9vmEn5YHB2LGu9nYkLlQ4LF8gQMI4WChxeQ5olo92smS','Acheteur','Deux','ACHETEUR'),(6,'2026-04-05','htp53953@gmail.com','$2a$10$k3At5y6fdTpzO4hRzW9xHO643Xf89Hw5I4gFid1.wlPH4OE5sqWDS','dlabaiad','moahme','ACHETEUR');
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
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
