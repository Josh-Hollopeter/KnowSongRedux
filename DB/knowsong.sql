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
DROP SCHEMA IF EXISTS `knowsong` ;

-- -----------------------------------------------------
-- Schema knowsong
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `knowsong` DEFAULT CHARACTER SET utf8 ;
USE `knowsong` ;

-- -----------------------------------------------------
-- Table `knowsong`.`album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`album` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `img_source` VARCHAR(255) NULL DEFAULT NULL,
  `type` VARCHAR(255) NULL DEFAULT NULL,
  `release_date` VARCHAR(255) NULL DEFAULT NULL,
  `release_date_precision` VARCHAR(255) NULL DEFAULT NULL,
  `created` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`available_market`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`available_market` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `market` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `market_UNIQUE` (`market` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`album_has_available_market`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`album_has_available_market` (
  `album_id` VARCHAR(255) NOT NULL,
  `available_market_id` INT(11) NOT NULL,
  PRIMARY KEY (`album_id`, `available_market_id`),
  INDEX `fk_album_has_available_market_available_market1_idx` (`available_market_id` ASC),
  INDEX `fk_album_has_available_market_album1_idx` (`album_id` ASC),
  CONSTRAINT `fk_album_has_available_market_album1`
    FOREIGN KEY (`album_id`)
    REFERENCES `knowsong`.`album` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_album_has_available_market_available_market1`
    FOREIGN KEY (`available_market_id`)
    REFERENCES `knowsong`.`available_market` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`artist` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `img_source` VARCHAR(255) NULL DEFAULT NULL,
  `popularity` INT(11) NULL DEFAULT NULL,
  `created` DATETIME NULL DEFAULT NULL,
  `last_updated` DATETIME NULL DEFAULT NULL,
  `trivia_ready` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`artist_album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`artist_album` (
  `artist_id` VARCHAR(255) NOT NULL,
  `album_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`artist_id`, `album_id`),
  INDEX `album_id_idx` (`album_id` ASC),
  CONSTRAINT `album_has_artist`
    FOREIGN KEY (`artist_id`)
    REFERENCES `knowsong`.`artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `artist_has_album`
    FOREIGN KEY (`album_id`)
    REFERENCES `knowsong`.`album` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`genre` (
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`artist_has_genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`artist_has_genre` (
  `artist_id` VARCHAR(255) NOT NULL,
  `genre_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`artist_id`, `genre_name`),
  INDEX `fk_artist_has_genre_genre1_idx` (`genre_name` ASC),
  INDEX `fk_artist_has_genre_artist1_idx` (`artist_id` ASC),
  CONSTRAINT `fk_artist_has_genre_artist1`
    FOREIGN KEY (`artist_id`)
    REFERENCES `knowsong`.`artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_artist_has_genre_genre1`
    FOREIGN KEY (`genre_name`)
    REFERENCES `knowsong`.`genre` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`playlist` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `spotify_id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(600) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`user` (
  `id` VARCHAR(50) NOT NULL,
  `username` VARCHAR(75) NOT NULL,
  `enabled` TINYINT(4) NULL DEFAULT '0',
  `admin` TINYINT(4) NULL DEFAULT '0',
  `img_source` TEXT NULL DEFAULT NULL,
  `premium` TINYINT(1) NULL,
  `market` VARCHAR(2) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`singleplayer_game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`singleplayer_game` (
  `id` INT(11) NOT NULL,
  `fk_user_id` VARCHAR(50) NOT NULL,
  `played` DATETIME NULL DEFAULT NULL,
  `artist` VARCHAR(255) NULL DEFAULT NULL,
  `game_type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`, `fk_user_id`),
  INDEX `fk_user_id_idx` (`fk_user_id` ASC),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`fk_user_id`)
    REFERENCES `knowsong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`singleplayer_question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`singleplayer_question` (
  `num` INT(11) NOT NULL,
  `fk_singleplayer_game_id` INT(11) NOT NULL,
  `fk_user_ref` VARCHAR(50) NOT NULL,
  `question_text` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NULL DEFAULT NULL,
  `option2` VARCHAR(255) NULL DEFAULT NULL,
  `option3` VARCHAR(255) NULL DEFAULT NULL,
  `option4` VARCHAR(255) NULL DEFAULT NULL,
  `user_response` VARCHAR(255) NULL DEFAULT NULL,
  `correct` TINYINT(1) NULL,
  `answer_href` VARCHAR(100) NULL,
  PRIMARY KEY (`num`, `fk_singleplayer_game_id`, `fk_user_ref`),
  INDEX `fk_user_ref_idx` (`fk_user_ref` ASC),
  INDEX `fk_singleplayer_game_id_idx` (`fk_singleplayer_game_id` ASC),
  CONSTRAINT `fk_singleplayer_game_id`
    FOREIGN KEY (`fk_singleplayer_game_id`)
    REFERENCES `knowsong`.`singleplayer_game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_ref`
    FOREIGN KEY (`fk_user_ref`)
    REFERENCES `knowsong`.`singleplayer_game` (`fk_user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`track` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `preview_url` VARCHAR(255) NULL DEFAULT NULL,
  `explicit` TINYINT(1) NULL DEFAULT NULL,
  `popularity` INT(11) NULL DEFAULT NULL,
  `duration_ms` INT(11) NULL DEFAULT NULL,
  `created` DATETIME NULL DEFAULT NULL,
  `fk_album_id` VARCHAR(255) NOT NULL,
  `spotify_id` VARCHAR(45) NULL,
  `href` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_album_id_idx` (`fk_album_id` ASC),
  CONSTRAINT `fk_album_id`
    FOREIGN KEY (`fk_album_id`)
    REFERENCES `knowsong`.`album` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`user_playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `knowsong`.`user_playlist` (
  `playlist_id` INT(11) NOT NULL,
  `user_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`playlist_id`, `user_id`),
  INDEX `fk_playlist_has_user_user1_idx` (`user_id` ASC),
  INDEX `fk_playlist_has_user_playlist1_idx` (`playlist_id` ASC),
  CONSTRAINT `fk_playlist_has_user_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `knowsong`.`playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `knowsong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
