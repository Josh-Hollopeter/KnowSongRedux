-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: knowsong
-- ------------------------------------------------------
-- Server version	5.7.26

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
-- Table structure for table `game_history`
--

DROP TABLE IF EXISTS `game_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `marks` varchar(45) DEFAULT NULL,
  `num_questions` varchar(45) DEFAULT NULL,
  `date_played` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_game_history_user1_idx` (`user_id`),
  CONSTRAINT `fk_game_history_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_history`
--

LOCK TABLES `game_history` WRITE;
/*!40000 ALTER TABLE `game_history` DISABLE KEYS */;
INSERT INTO `game_history` VALUES (1,'7','10','2020-02-28 00:00:00',1),(2,'6','10','2020-02-28 00:00:00',2);
/*!40000 ALTER TABLE `game_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `spotify_id` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(600) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES (1,'19PgP2QSGPcm6Ve8VhbtpG','80\'s Smash HIt','1980s hits and retro favorites by Michael Jackson, Toto & more!');
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_category`
--

DROP TABLE IF EXISTS `question_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_category`
--

LOCK TABLES `question_category` WRITE;
/*!40000 ALTER TABLE `question_category` DISABLE KEYS */;
INSERT INTO `question_category` VALUES (1,'year');
/*!40000 ALTER TABLE `question_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rank`
--

DROP TABLE IF EXISTS `rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rank` (
  `id` int(11) NOT NULL,
  `img_source` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rank`
--

LOCK TABLES `rank` WRITE;
/*!40000 ALTER TABLE `rank` DISABLE KEYS */;
INSERT INTO `rank` VALUES (1,'https://www.disneyclips.com/images/images/jiminy.png');
/*!40000 ALTER TABLE `rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trivia`
--

DROP TABLE IF EXISTS `trivia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trivia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_category_id` int(11) NOT NULL,
  `question` varchar(500) DEFAULT NULL,
  `point` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_trivia_question_category1_idx` (`question_category_id`),
  CONSTRAINT `fk_trivia_question_category1` FOREIGN KEY (`question_category_id`) REFERENCES `question_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trivia`
--

LOCK TABLES `trivia` WRITE;
/*!40000 ALTER TABLE `trivia` DISABLE KEYS */;
INSERT INTO `trivia` VALUES (1,1,'Artist album AlbumName was released in Year.',1);
/*!40000 ALTER TABLE `trivia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trivia_game`
--

DROP TABLE IF EXISTS `trivia_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trivia_game` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_played` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_trivia_game_user_idx` (`user_id`),
  CONSTRAINT `fk_trivia_game_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trivia_game`
--

LOCK TABLES `trivia_game` WRITE;
/*!40000 ALTER TABLE `trivia_game` DISABLE KEYS */;
INSERT INTO `trivia_game` VALUES (1,2,'2020-02-21 00:00:00'),(2,3,'2020-02-21 00:00:00'),(3,4,'2020-02-21 00:00:00');
/*!40000 ALTER TABLE `trivia_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trivia_game_question`
--

DROP TABLE IF EXISTS `trivia_game_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trivia_game_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trivia_game_id` int(11) NOT NULL,
  `trivia_id` int(11) NOT NULL,
  `correct` tinyint(4) DEFAULT '0',
  `question_text` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_trivia_game_has_trivia_trivia1_idx` (`trivia_id`),
  KEY `fk_trivia_game_has_trivia_trivia_game1_idx` (`trivia_game_id`),
  CONSTRAINT `fk_trivia_game_has_trivia_trivia1` FOREIGN KEY (`trivia_id`) REFERENCES `trivia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_trivia_game_has_trivia_trivia_game1` FOREIGN KEY (`trivia_game_id`) REFERENCES `trivia_game` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trivia_game_question`
--

LOCK TABLES `trivia_game_question` WRITE;
/*!40000 ALTER TABLE `trivia_game_question` DISABLE KEYS */;
INSERT INTO `trivia_game_question` VALUES (1,1,1,1,'Beyonce album Lemonade was released in 2014.');
/*!40000 ALTER TABLE `trivia_game_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rank_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` varchar(45) NOT NULL,
  `enabled` tinyint(4) DEFAULT '0',
  `admin` tinyint(4) DEFAULT '0',
  `auth_token` varchar(200) DEFAULT NULL,
  `refresh_token` varchar(200) DEFAULT NULL,
  `img_source` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_user_rank1_idx` (`rank_id`),
  CONSTRAINT `fk_user_rank1` FOREIGN KEY (`rank_id`) REFERENCES `rank` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'admin','$2a$10$ox9m7AtAzlIZBH9k9pPz0efNkMADYHVQVbZ..y0D08G2KIT43eJCe','admin',1,1,NULL,NULL,'https://static.parade.com/wp-content/uploads/2013/07/roller-coaster-ftr.jpg'),(2,1,'josh','$2a$10$I7FfieVXCfUaTMB9UL20t.v/725ElTMKHOPSop1DtPNubwp7Ddr6y','standard',1,0,NULL,NULL,'https://static.parade.com/wp-content/uploads/2013/07/roller-coaster-ftr.jpg'),(3,1,'neal','$2a$10$vfBYDhgCCte1CxLG5q/aZuatG4CSAUdSebH9VpY5Pz1W9dcnQA.Pa','standard',1,0,NULL,NULL,'https://static.parade.com/wp-content/uploads/2013/07/roller-coaster-ftr.jpg'),(4,1,'george','$2a$10$sKWxXOgA1dAhMUMqD5HzAeoVug1ZvLyAuwQbswbuou1WXgl34A8Cu','admin',1,0,'BQD9mOMGwPDPUT2QypLUXLN9ajbUQMN0m_XgaijQi1MYdOIpGeNZOyTK3x2uSspFxB14keI6isArxyiYo7WuC5mKASS4ILCaOFgHCHEsN6oi48j5o7QfSM_pyl73zSo-A1dykFJTizpXE8P-a-oVZEPHfSBmHpBoCEk9Z6EePg2q0otO8A','AQBtNWqDiXcn9d-MazhLrv7jmUqP5cjbb-4PLWwpqjdc8OpyQBJ_3yJ2chTZl2ytF42RkXJw9NX64Q_3U5aM_D0gJQezV1E4G-bayEQ3JAkCxqv9mtDTvODrk0CUZ6twon4','https://static.parade.com/wp-content/uploads/2013/07/roller-coaster-ftr.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_friend`
--

DROP TABLE IF EXISTS `user_has_friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_friend` (
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `date_friended` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`,`friend_id`),
  KEY `fk_user_has_user_user2_idx` (`friend_id`),
  KEY `fk_user_has_user_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_user_user2` FOREIGN KEY (`friend_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_friend`
--

LOCK TABLES `user_has_friend` WRITE;
/*!40000 ALTER TABLE `user_has_friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_playlist`
--

DROP TABLE IF EXISTS `user_playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_playlist` (
  `playlist_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`playlist_id`,`user_id`),
  KEY `fk_playlist_has_user_user1_idx` (`user_id`),
  KEY `fk_playlist_has_user_playlist_idx` (`playlist_id`),
  CONSTRAINT `fk_playlist_has_user_playlist` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_playlist`
--

LOCK TABLES `user_playlist` WRITE;
/*!40000 ALTER TABLE `user_playlist` DISABLE KEYS */;
INSERT INTO `user_playlist` VALUES (1,1),(1,2),(1,3),(1,4);
/*!40000 ALTER TABLE `user_playlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-01 14:40:48
