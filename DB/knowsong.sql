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
  `id` INT NOT NULL,
  `img_source` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rank_id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `enabled` TINYINT NULL DEFAULT 0,
  `admin` TINYINT NULL DEFAULT 0,
  `auth_token` VARCHAR(200) NULL,
  `refresh_token` VARCHAR(200) NULL,
  `img_source` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  INDEX `fk_user_rank1_idx` (`rank_id` ASC),
  CONSTRAINT `fk_user_rank1`
    FOREIGN KEY (`rank_id`)
    REFERENCES `rank` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `question_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `question_category` ;

CREATE TABLE IF NOT EXISTS `question_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trivia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trivia` ;

CREATE TABLE IF NOT EXISTS `trivia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question_category_id` INT NOT NULL,
  `question` VARCHAR(500) NULL,
  `point` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trivia_question_category1_idx` (`question_category_id` ASC),
  CONSTRAINT `fk_trivia_question_category1`
    FOREIGN KEY (`question_category_id`)
    REFERENCES `question_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `playlist` ;

CREATE TABLE IF NOT EXISTS `playlist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `spotify_id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(600) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_playlist` ;

CREATE TABLE IF NOT EXISTS `user_playlist` (
  `playlist_id` INT NOT NULL,
  `user_id` INT NOT NULL,
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
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trivia_game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trivia_game` ;

CREATE TABLE IF NOT EXISTS `trivia_game` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `date_played` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trivia_game_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_trivia_game_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trivia_game_question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trivia_game_question` ;

CREATE TABLE IF NOT EXISTS `trivia_game_question` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `trivia_game_id` INT NOT NULL,
  `trivia_id` INT NOT NULL,
  `correct` TINYINT NULL DEFAULT 0,
  `question_text` VARCHAR(500) NULL,
  INDEX `fk_trivia_game_has_trivia_trivia1_idx` (`trivia_id` ASC),
  INDEX `fk_trivia_game_has_trivia_trivia_game1_idx` (`trivia_game_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_trivia_game_has_trivia_trivia_game1`
    FOREIGN KEY (`trivia_game_id`)
    REFERENCES `trivia_game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trivia_game_has_trivia_trivia1`
    FOREIGN KEY (`trivia_id`)
    REFERENCES `trivia` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_has_friend`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_has_friend` ;

CREATE TABLE IF NOT EXISTS `user_has_friend` (
  `user_id` INT NOT NULL,
  `friend_id` INT NOT NULL,
  `date_friended` DATETIME NULL,
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
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS knowsong@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'knowsong'@'localhost' IDENTIFIED BY 'knowsong';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'knowsong'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `rank`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `rank` (`id`, `img_source`) VALUES (1, 'https://www.disneyclips.com/images/images/jiminy.png');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `user` (`id`, `rank_id`, `username`, `password`, `role`, `enabled`, `admin`, `auth_token`, `refresh_token`, `img_source`) VALUES (1, 1, 'admin', '$2a$10$ox9m7AtAzlIZBH9k9pPz0efNkMADYHVQVbZ..y0D08G2KIT43eJCe', 'admin', true, true, NULL, NULL, NULL);
INSERT INTO `user` (`id`, `rank_id`, `username`, `password`, `role`, `enabled`, `admin`, `auth_token`, `refresh_token`, `img_source`) VALUES (2, 1, 'josh', '$2a$10$I7FfieVXCfUaTMB9UL20t.v/725ElTMKHOPSop1DtPNubwp7Ddr6y', 'standard', true, false, NULL, NULL, 'https://static.parade.com/wp-content/uploads/2013/07/roller-coaster-ftr.jpg');
INSERT INTO `user` (`id`, `rank_id`, `username`, `password`, `role`, `enabled`, `admin`, `auth_token`, `refresh_token`, `img_source`) VALUES (3, 1, 'neal', '$2a$10$vfBYDhgCCte1CxLG5q/aZuatG4CSAUdSebH9VpY5Pz1W9dcnQA.Pa', 'standard', true, false, NULL, NULL, 'https://static.parade.com/wp-content/uploads/2013/07/roller-coaster-ftr.jpg');
INSERT INTO `user` (`id`, `rank_id`, `username`, `password`, `role`, `enabled`, `admin`, `auth_token`, `refresh_token`, `img_source`) VALUES (4, 1, 'george', '$2a$10$sKWxXOgA1dAhMUMqD5HzAeoVug1ZvLyAuwQbswbuou1WXgl34A8Cu', 'admin', true, false, 'BQAK89zpFGq785A85IkfpDxISGiEHgRyLb7ZQ5W80Dw_LC_Nx8vRaG3yY9Y77PHxDfE5bFc9LVJoFOWYO7X4ZKAucldys3zRe0gPTvSrIVMWJnaH7ePCYAAgVHTMlFkQN2sVupHeL1nMH6FXnCADYnAOw4yE1cMdM0NbcCSuRcH2aH1WNA', 'AQBtNWqDiXcn9d-MazhLrv7jmUqP5cjbb-4PLWwpqjdc8OpyQBJ_3yJ2chTZl2ytF42RkXJw9NX64Q_3U5aM_D0gJQezV1E4G-bayEQ3JAkCxqv9mtDTvODrk0CUZ6twon4', 'https://static.parade.com/wp-content/uploads/2013/07/roller-coaster-ftr.jpg');

COMMIT;


-- -----------------------------------------------------
-- Data for table `question_category`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `question_category` (`id`, `category`) VALUES (1, 'year');

COMMIT;


-- -----------------------------------------------------
-- Data for table `trivia`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `trivia` (`id`, `question_category_id`, `question`, `point`) VALUES (1, 1, 'Artist album AlbumName was released in Year.', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `playlist`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `playlist` (`id`, `spotify_id`, `name`, `description`) VALUES (1, '19PgP2QSGPcm6Ve8VhbtpG', '80\'s Smash HIt', '1980s hits and retro favorites by Michael Jackson, Toto & more!');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_playlist`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `user_playlist` (`playlist_id`, `user_id`) VALUES (1, 1);
INSERT INTO `user_playlist` (`playlist_id`, `user_id`) VALUES (1, 2);
INSERT INTO `user_playlist` (`playlist_id`, `user_id`) VALUES (1, 3);
INSERT INTO `user_playlist` (`playlist_id`, `user_id`) VALUES (1, 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trivia_game`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `trivia_game` (`id`, `user_id`, `date_played`) VALUES (1, 2, '2020-02-21');
INSERT INTO `trivia_game` (`id`, `user_id`, `date_played`) VALUES (2, 3, '2020-02-21');
INSERT INTO `trivia_game` (`id`, `user_id`, `date_played`) VALUES (3, 4, '2020-02-21');

COMMIT;


-- -----------------------------------------------------
-- Data for table `trivia_game_question`
-- -----------------------------------------------------
START TRANSACTION;
USE `knowsong`;
INSERT INTO `trivia_game_question` (`id`, `trivia_game_id`, `trivia_id`, `correct`, `question_text`) VALUES (1, 1, 1, true, 'Beyonce album Lemonade was released in 2014.');

COMMIT;

