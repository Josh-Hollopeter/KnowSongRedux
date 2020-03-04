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
DROP TABLE IF EXISTS `knowsong`.`game_history` ;

CREATE TABLE IF NOT EXISTS `knowsong`.`game_history` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `marks` VARCHAR(45) NULL DEFAULT NULL,
  `num_questions` VARCHAR(45) NULL DEFAULT NULL,
  `date_played` DATETIME NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  `question_text` VARCHAR(5000) NULL,
  `answer_text` VARCHAR(5000) NULL,
  `chosen_text` VARCHAR(5000) NULL,
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
DROP TABLE IF EXISTS `knowsong`.`playlist` ;

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
DROP TABLE IF EXISTS `knowsong`.`question_category` ;

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
DROP TABLE IF EXISTS `knowsong`.`trivia` ;

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
DROP TABLE IF EXISTS `knowsong`.`trivia_game` ;

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
DROP TABLE IF EXISTS `knowsong`.`trivia_game_question` ;

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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

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
INSERT INTO `knowsong`.`user` (`id`, `rank_id`, `username`, `password`, `role`, `enabled`, `admin`, `auth_token`, `refresh_token`, `img_source`) VALUES (1, 1, 'test', 'test', 'standard', 1, 0, NULL, NULL, NULL);
INSERT INTO `knowsong`.`user` (`id`, `rank_id`, `username`, `password`, `role`, `enabled`, `admin`, `auth_token`, `refresh_token`, `img_source`) VALUES (2, 1, 'josh', 'josh', 'admin', 1, 1, NULL, 'AQB6QtBZc0C7dSsu0ngVcIVh5DGvWjTgJKk2_7nmrTEZXHUv7hjNt-am8hwltAwSDImFp-vXfwgYHeIrI8zORI9Qk78hzAU79_xn9FFxMrEDq1tTdWYUhFCyduSRpVt9yCk', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `knowsong`.`game_history`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `knowsong`.`game_history` (`id`, `marks`, `num_questions`, `date_played`, `user_id`, `question_text`, `answer_text`, `chosen_text`) VALUES (1, '7', '10', '2020-01-01', 1, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `knowsong`.`playlist`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `knowsong`.`playlist` (`id`, `spotify_id`, `name`, `description`) VALUES (1, '19PgP2QSGPcm6Ve8VhbtpG', '\'80\\\'s Smash HIt\'', '1980s hits and retro favorites by Michael Jackson, Toto & more!');

COMMIT;


-- -----------------------------------------------------
-- Data for table `knowsong`.`question_category`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `knowsong`.`question_category` (`id`, `category`) VALUES (1, '1');

COMMIT;


-- -----------------------------------------------------
-- Data for table `knowsong`.`trivia`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `knowsong`.`trivia` (`id`, `question_category_id`, `question`, `point`) VALUES (1, 1, '\"hello\"', 6);

COMMIT;


-- -----------------------------------------------------
-- Data for table `knowsong`.`trivia_game`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `knowsong`.`trivia_game` (`id`, `user_id`, `date_played`) VALUES (1, 1, '2020-01-01');

COMMIT;


-- -----------------------------------------------------
-- Data for table `knowsong`.`trivia_game_question`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `knowsong`.`trivia_game_question` (`id`, `trivia_game_id`, `trivia_id`, `correct`, `question_text`) VALUES (1, 1, 1, 1, '\"hello\"');

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


