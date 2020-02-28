-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema knowsong
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema knowsong
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `knowsong` DEFAULT CHARACTER SET utf8 ;
USE `knowsong` ;

-- -----------------------------------------------------
-- Table `knowsong`.`rank`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`rank` (
  `id` INT(11) NOT NULL,
  `img_source` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`user` (
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
    REFERENCES `knowsong`.`rank` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`game_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`game_history` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `marks` VARCHAR(45) NULL DEFAULT NULL,
  `num_questions` VARCHAR(45) NULL DEFAULT NULL,
  `date_played` DATETIME NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_game_history_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_game_history_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `knowsong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`playlist` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `spotify_id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(600) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`question_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`question_category` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`trivia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`trivia` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `question_category_id` INT(11) NOT NULL,
  `question` VARCHAR(500) NULL DEFAULT NULL,
  `point` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trivia_question_category1_idx` (`question_category_id` ASC),
  CONSTRAINT `fk_trivia_question_category1`
    FOREIGN KEY (`question_category_id`)
    REFERENCES `knowsong`.`question_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`trivia_game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`trivia_game` (
  `id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `date_played` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trivia_game_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_trivia_game_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `knowsong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`trivia_game_question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`trivia_game_question` (
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
    REFERENCES `knowsong`.`trivia` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trivia_game_has_trivia_trivia_game1`
    FOREIGN KEY (`trivia_game_id`)
    REFERENCES `knowsong`.`trivia_game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`user_has_friend`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`user_has_friend` (
  `user_id` INT(11) NOT NULL,
  `friend_id` INT(11) NOT NULL,
  `date_friended` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`, `friend_id`),
  INDEX `fk_user_has_user_user2_idx` (`friend_id` ASC),
  INDEX `fk_user_has_user_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `knowsong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_user_user2`
    FOREIGN KEY (`friend_id`)
    REFERENCES `knowsong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
