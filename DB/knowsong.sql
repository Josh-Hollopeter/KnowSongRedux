-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema knowsong
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `knowsong` ;

-- -----------------------------------------------------
-- Schema knowsong
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `knowsong` DEFAULT CHARACTER SET utf8 ;
USE `knowsong` ;

-- -----------------------------------------------------
-- Table `rank`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rank` ;

CREATE TABLE IF NOT EXISTS `rank` (
  `id` INT(11) NOT NULL,
  `img_source` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `rank_id` INT(11) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(4) NULL DEFAULT '0',
  `admin` TINYINT(4) NULL DEFAULT '0',
  `auth_token` VARCHAR(200) NULL DEFAULT NULL,
  `refresh_token` VARCHAR(200) NULL DEFAULT NULL,
  `img_source` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  INDEX `fk_user_rank1_idx` (`rank_id` ASC),
  CONSTRAINT `fk_user_rank1`
    FOREIGN KEY (`rank_id`)
    REFERENCES `rank` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `game_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `game_history` ;

CREATE TABLE IF NOT EXISTS `game_history` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `marks` VARCHAR(45) NULL DEFAULT NULL,
  `num_questions` VARCHAR(45) NULL DEFAULT NULL,
  `date_played` DATETIME NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_game_history_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_game_history_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `playlist` ;

CREATE TABLE IF NOT EXISTS `playlist` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `spotify_id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(600) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `question_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `question_category` ;

CREATE TABLE IF NOT EXISTS `question_category` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `trivia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trivia` ;

CREATE TABLE IF NOT EXISTS `trivia` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `question_category_id` INT(11) NOT NULL,
  `question` VARCHAR(500) NULL DEFAULT NULL,
  `point` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trivia_question_category1_idx` (`question_category_id` ASC),
  CONSTRAINT `fk_trivia_question_category1`
    FOREIGN KEY (`question_category_id`)
    REFERENCES `question_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `trivia_game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trivia_game` ;

CREATE TABLE IF NOT EXISTS `trivia_game` (
  `id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `date_played` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trivia_game_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_trivia_game_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `trivia_game_question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trivia_game_question` ;

CREATE TABLE IF NOT EXISTS `trivia_game_question` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `trivia_game_id` INT(11) NOT NULL,
  `trivia_id` INT(11) NOT NULL,
  `correct` TINYINT(4) NULL DEFAULT '0',
  `question_text` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trivia_game_has_trivia_trivia1_idx` (`trivia_id` ASC),
  INDEX `fk_trivia_game_has_trivia_trivia_game1_idx` (`trivia_game_id` ASC),
  CONSTRAINT `fk_trivia_game_has_trivia_trivia1`
    FOREIGN KEY (`trivia_id`)
    REFERENCES `trivia` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trivia_game_has_trivia_trivia_game1`
    FOREIGN KEY (`trivia_game_id`)
    REFERENCES `trivia_game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `user_has_friend`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_has_friend` ;

CREATE TABLE IF NOT EXISTS `user_has_friend` (
  `user_id` INT(11) NOT NULL,
  `friend_id` INT(11) NOT NULL,
  `date_friended` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`, `friend_id`),
  INDEX `fk_user_has_user_user2_idx` (`friend_id` ASC),
  INDEX `fk_user_has_user_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_user_user2`
    FOREIGN KEY (`friend_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `user_playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_playlist` ;

CREATE TABLE IF NOT EXISTS `user_playlist` (
  `playlist_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`playlist_id`, `user_id`),
  INDEX `fk_playlist_has_user_user1_idx` (`user_id` ASC),
  INDEX `fk_playlist_has_user_playlist_idx` (`playlist_id` ASC),
  CONSTRAINT `fk_playlist_has_user_playlist`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE = '';
DROP USER IF EXISTS knowsong@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'knowsong'@'localhost' IDENTIFIED BY 'knowsong';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'knowsong'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
