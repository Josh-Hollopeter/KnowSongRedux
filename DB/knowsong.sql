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
-- Table `knowsong`.`playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`playlist` ;

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
-- Table `knowsong`.`rank`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`rank` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`rank` (
  `id` INT(11) NOT NULL,
  `img_source` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`user` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `fk_rank_id` INT(11) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(4) NULL DEFAULT '0',
  `admin` TINYINT(4) NULL DEFAULT '0',
  `img_source` TEXT NULL DEFAULT NULL,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  PRIMARY KEY (`id`),
  INDEX `fk_rank_id_idx` (`fk_rank_id` ASC),
  CONSTRAINT `fk_rank_id`
    FOREIGN KEY (`fk_rank_id`)
    REFERENCES `knowsong`.`rank` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `knowsong`.`user_has_friend`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`user_has_friend` ;

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


-- -----------------------------------------------------
-- Table `knowsong`.`user_playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`user_playlist` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`user_playlist` (
  `playlist_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
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


-- -----------------------------------------------------
-- Table `knowsong`.`artist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`artist` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`artist` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL,
  `img_source` VARCHAR(255) NULL,
  `href` VARCHAR(255) NULL,
  `popularity` INT NULL,
  `created` DATETIME NULL,
  `last_updated` DATETIME NULL,
  `trivia_ready` TINYINT(1) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `knowsong`.`album`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`album` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`album` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL,
  `img_source` VARCHAR(255) NULL,
  `type` VARCHAR(255) NULL,
  `release_date` VARCHAR(255) NULL,
  `release_date_precision` VARCHAR(255) NULL,
  `href` VARCHAR(255) NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `knowsong`.`track`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`track` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`track` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL,
  `preview_url` VARCHAR(255) NULL,
  `explicit` TINYINT(1) NULL,
  `popularity` INT NULL,
  `href` VARCHAR(255) NULL,
  `duration_ms` INT NULL,
  `created` DATETIME NULL,
  `fk_album_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_album_id_idx` (`fk_album_id` ASC),
  CONSTRAINT `fk_album_id`
    FOREIGN KEY (`fk_album_id`)
    REFERENCES `knowsong`.`album` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `knowsong`.`genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`genre` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`genre` (
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `id_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `knowsong`.`available_markets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`available_markets` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`available_markets` (
  `market` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`market`),
  UNIQUE INDEX `market_UNIQUE` (`market` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `knowsong`.`artist_album`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`artist_album` ;

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
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `knowsong`.`singleplayer_game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`singleplayer_game` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`singleplayer_game` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `played` DATETIME NULL,
  `description` VARCHAR(255) NULL,
  `fk_user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_id_idx` (`fk_user_id` ASC),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`fk_user_id`)
    REFERENCES `knowsong`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `knowsong`.`singleplayer_question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`singleplayer_question` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`singleplayer_question` (
  `num` INT NOT NULL,
  `fk_singeplayer_game_id` INT NOT NULL,
  `question_text` VARCHAR(255) NULL,
  `answer` VARCHAR(255) NULL,
  `option2` VARCHAR(255) NULL,
  `option3` VARCHAR(255) NULL,
  `option4` VARCHAR(255) NULL,
  `user_response` VARCHAR(255) NULL,
  PRIMARY KEY (`num`),
  INDEX `fk_game_id_idx` (`fk_singeplayer_game_id` ASC),
  CONSTRAINT `fk_singleplayer_game_id`
    FOREIGN KEY (`fk_singeplayer_game_id`)
    REFERENCES `knowsong`.`singleplayer_game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `knowsong`.`artist_genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`artist_genre` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`artist_genre` (
  `artist_id` VARCHAR(255) NOT NULL,
  `genre_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`artist_id`, `genre_name`),
  INDEX `artist_has_genre_idx` (`genre_name` ASC),
  CONSTRAINT `artist_has_genre`
    FOREIGN KEY (`genre_name`)
    REFERENCES `knowsong`.`genre` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `genre_has_artist`
    FOREIGN KEY (`artist_id`)
    REFERENCES `knowsong`.`artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `knowsong`.`album_market`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `knowsong`.`album_market` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`album_market` (
  `album_id` VARCHAR(255) NOT NULL,
  `available_market_market` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`album_id`, `available_market_market`),
  INDEX `album_has_market_idx` (`available_market_market` ASC),
  CONSTRAINT `album_has_market`
    FOREIGN KEY (`available_market_market`)
    REFERENCES `knowsong`.`available_markets` (`market`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `market_has_album`
    FOREIGN KEY (`album_id`)
    REFERENCES `knowsong`.`album` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS knowsong;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'knowsong' IDENTIFIED BY 'knowsong';

GRANT ALL ON `knowsong`.* TO 'knowsong';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `knowsong`.`playlist`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `knowsong`.`playlist` (`id`, `spotify_id`, `name`, `description`) VALUES (1, '19PgP2QSGPcm6Ve8VhbtpG', '\'80\\\'s Smash HIt\'', '1980s hits and retro favorites by Michael Jackson, Toto & more!');

COMMIT;


-- -----------------------------------------------------
-- Data for table `knowsong`.`rank`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `knowsong`.`rank` (`id`, `img_source`) VALUES (1, 'https://image.shutterstock.com/image-photo/cricket-600w-677730169.jpg');

COMMIT;


-- -----------------------------------------------------
-- Data for table `knowsong`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `knowsong`.`user` (`id`, `fk_rank_id`, `username`, `enabled`, `admin`, `img_source`) VALUES (1, 1, 'test', 1, 0, NULL);
INSERT INTO `knowsong`.`user` (`id`, `fk_rank_id`, `username`, `enabled`, `admin`, `img_source`) VALUES (2, 1, 'josh', 1, 1, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `knowsong`.`user_has_friend`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `knowsong`.`user_has_friend` (`user_id`, `friend_id`, `date_friended`) VALUES (1, 1, '2020-01-01');

COMMIT;


-- -----------------------------------------------------
-- Data for table `knowsong`.`user_playlist`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `knowsong`.`user_playlist` (`playlist_id`, `user_id`) VALUES (1, 1);

COMMIT;

