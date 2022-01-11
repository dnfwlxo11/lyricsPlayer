DROP DATABASE lylics_player;

-- MySQL Script generated by MySQL Workbench
-- Mon Jan 10 17:30:49 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema lylics_player
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema lylics_player
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `lylics_player` DEFAULT CHARACTER SET utf8 ;
USE `lylics_player` ;

-- -----------------------------------------------------
-- Table `lylics_player`.`tb_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lylics_player`.`tb_users` (
  `uid` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`uid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lylics_player`.`tb_musicians`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lylics_player`.`tb_musicians` (
  `mid` INT NOT NULL AUTO_INCREMENT,
  `musician_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`mid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lylics_player`.`tb_albums`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lylics_player`.`tb_albums` (
  `aid` INT NOT NULL AUTO_INCREMENT,
  `album_name` VARCHAR(45) NOT NULL,
  `tb_musicians_mid` INT NOT NULL,
  `thumbnail_path` VARCHAR(100) NULL,
  PRIMARY KEY (`aid`),
  INDEX `fk_tb_albums_tb_musicians_idx` (`tb_musicians_mid` ASC),
  CONSTRAINT `fk_tb_albums_tb_musicians`
    FOREIGN KEY (`tb_musicians_mid`)
    REFERENCES `lylics_player`.`tb_musicians` (`mid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lylics_player`.`tb_songs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lylics_player`.`tb_songs` (
  `sid` INT NOT NULL AUTO_INCREMENT,
  `song_name` VARCHAR(45) NOT NULL,
  `playtime` VARCHAR(45) NOT NULL,
  `thumbnail_path` VARCHAR(100) NULL,
  `tb_albums_aid` INT NOT NULL,
  `album` VARCHAR(45) NULL,
  PRIMARY KEY (`sid`),
  INDEX `fk_tb_songs_tb_albums1_idx` (`tb_albums_aid` ASC),
  CONSTRAINT `fk_tb_songs_tb_albums1`
    FOREIGN KEY (`tb_albums_aid`)
    REFERENCES `lylics_player`.`tb_albums` (`aid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lylics_player`.`tb_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lylics_player`.`tb_comments` (
  `cid` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(200) NOT NULL,
  `tb_songs_sid` INT NOT NULL,
  `tb_users_uid` INT NOT NULL,
  PRIMARY KEY (`cid`),
  INDEX `fk_tb_comments_tb_songs1_idx` (`tb_songs_sid` ASC),
  INDEX `fk_tb_comments_tb_users1_idx` (`tb_users_uid` ASC),
  CONSTRAINT `fk_tb_comments_tb_songs1`
    FOREIGN KEY (`tb_songs_sid`)
    REFERENCES `lylics_player`.`tb_songs` (`sid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_comments_tb_users1`
    FOREIGN KEY (`tb_users_uid`)
    REFERENCES `lylics_player`.`tb_users` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lylics_player`.`tb_song_likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lylics_player`.`tb_song_likes` (
  `tb_songs_sid` INT NOT NULL,
  `cnt` INT NULL,
  INDEX `fk_tb_song_like_tb_songs1_idx` (`tb_songs_sid` ASC),
  CONSTRAINT `fk_tb_song_like_tb_songs1`
    FOREIGN KEY (`tb_songs_sid`)
    REFERENCES `lylics_player`.`tb_songs` (`sid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lylics_player`.`tb_album_likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lylics_player`.`tb_album_likes` (
  `tb_albums_aid` INT NOT NULL,
  `cnt` INT NULL,
  INDEX `fk_tb_album_like_tb_albums1_idx` (`tb_albums_aid` ASC),
  CONSTRAINT `fk_tb_album_like_tb_albums1`
    FOREIGN KEY (`tb_albums_aid`)
    REFERENCES `lylics_player`.`tb_albums` (`aid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lylics_player`.`tb_user_likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lylics_player`.`tb_user_likes` (
  `tb_users_uid` INT NOT NULL,
  `cnt` INT NULL,
  INDEX `fk_tb_user_like_tb_users1_idx` (`tb_users_uid` ASC),
  CONSTRAINT `fk_tb_user_like_tb_users1`
    FOREIGN KEY (`tb_users_uid`)
    REFERENCES `lylics_player`.`tb_users` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lylics_player`.`tb_playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lylics_player`.`tb_playlist` (
  `tb_users_uid` INT NOT NULL,
  `tb_songs_sid` INT NOT NULL,
  INDEX `fk_tb_playlist_tb_users1_idx` (`tb_users_uid` ASC),
  INDEX `fk_tb_playlist_tb_songs1_idx` (`tb_songs_sid` ASC),
  CONSTRAINT `fk_tb_playlist_tb_users1`
    FOREIGN KEY (`tb_users_uid`)
    REFERENCES `lylics_player`.`tb_users` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_playlist_tb_songs1`
    FOREIGN KEY (`tb_songs_sid`)
    REFERENCES `lylics_player`.`tb_songs` (`sid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- -----------------------------------------------------
-- Insert Sample Data
-- -----------------------------------------------------

-- 뮤지션 추가
INSERT INTO tb_musicians(musician_name) VALUES ('Cole Powell');
INSERT INTO tb_musicians(musician_name) VALUES ('Color Out');
INSERT INTO tb_musicians(musician_name) VALUES ('Dylan Emmet');
INSERT INTO tb_musicians(musician_name) VALUES ('Kavi Jezzie Hockaday');
INSERT INTO tb_musicians(musician_name) VALUES ('MODUS');
INSERT INTO tb_musicians(musician_name) VALUES ('Nick Ray');
INSERT INTO tb_musicians(musician_name) VALUES ('Niwel');
INSERT INTO tb_musicians(musician_name) VALUES ('RYYZN');
INSERT INTO tb_musicians(musician_name) VALUES ('Vince Miranda');

INSERT INTO tb_albums(album_name, tb_musicians_mid, thumbnail_path) VALUES ('Cole Powell 1집', (SELECT mid FROM tb_musicians WHERE musician_name='Cole Powell'), '/images/persian.jpg');
INSERT INTO tb_albums(album_name, tb_musicians_mid, thumbnail_path) VALUES ('Color Out 1집', (SELECT mid FROM tb_musicians WHERE musician_name='Color Out'), '/images/regdoll.jpg');
INSERT INTO tb_albums(album_name, tb_musicians_mid, thumbnail_path) VALUES ('Dylan Emmet 1집', (SELECT mid FROM tb_musicians WHERE musician_name='Dylan Emmet'), '/images/russian.jpg');
INSERT INTO tb_albums(album_name, tb_musicians_mid, thumbnail_path) VALUES ('Kavi Jezzie Hockaday 1집', (SELECT mid FROM tb_musicians WHERE musician_name='Kavi Jezzie Hockaday'), '/images/scotish.jpg');
INSERT INTO tb_albums(album_name, tb_musicians_mid, thumbnail_path) VALUES ('MODUS 1집', (SELECT mid FROM tb_musicians WHERE musician_name='MODUS'), '/images/siam.jpg');
INSERT INTO tb_albums(album_name, tb_musicians_mid, thumbnail_path) VALUES ('Nick Ray 1집', (SELECT mid FROM tb_musicians WHERE musician_name='Nick Ray'), '/images/user.jpg');
INSERT INTO tb_albums(album_name, tb_musicians_mid, thumbnail_path) VALUES ('Niwel 1집', (SELECT mid FROM tb_musicians WHERE musician_name='Niwel'), '/images/cat1.jpg');
INSERT INTO tb_albums(album_name, tb_musicians_mid, thumbnail_path) VALUES ('RYYZN 1집', (SELECT mid FROM tb_musicians WHERE musician_name='RYYZN'), '/images/cat2.jpg');
INSERT INTO tb_albums(album_name, tb_musicians_mid, thumbnail_path) VALUES ('Vince Miranda 1집', (SELECT mid FROM tb_musicians WHERE musician_name='Vince Miranda'), '/images/cat3.jpg');

-- 앨범 및 노래 추가 --
INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('Always Ever Be', '255', '/images/persian.jpg', (SELECT aid FROM tb_albums WHERE album_name='Cole Powell 1집'), 'Cole Powell');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'Always Ever Be'), 0);
INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('Not the One to Say I Told You So', '255', '/images/british.jpg', (SELECT aid FROM tb_albums WHERE album_name='Cole Powell 1집'), 'Cole Powell');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'Not the One to Say I Told You So'), 0);

INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('Alone', '255', '/images/scotish.jpg', (SELECT aid FROM tb_albums WHERE album_name='Color Out 1집'), 'Color Out');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'Alone'), 0);

INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('Some Things Dont Change', '255', '/images/russian.jpg', (SELECT aid FROM tb_albums WHERE album_name='Dylan Emmet 1집'), 'Dylan Emmet');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'Some Things Dont Change'), 0);

INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('Dont Throw Your Light Away', '255', '/images/siam.jpg', (SELECT aid FROM tb_albums WHERE album_name='Kavi Jezzie Hockaday 1집'), 'Kavi Jezzie Hockaday');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'Dont Throw Your Light Away'), 0);
INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('Everyone Will Fall Down', '255', '/images/regdoll.jpg', (SELECT aid FROM tb_albums WHERE album_name='Kavi Jezzie Hockaday 1집'), 'Kavi Jezzie Hockaday');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'Everyone Will Fall Down'), 0);

INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('My Love', '255', '/images/cat6.jpg', (SELECT aid FROM tb_albums WHERE album_name='MODUS 1집'), 'MODUS');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'My Love'), 0);

INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('Tread Lightly', '255', '/images/cat1.jpg', (SELECT aid FROM tb_albums WHERE album_name='Nick Ray 1집'), 'Nick Ray');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'Tread Lightly'), 0);

INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('Leave Me Again', '255', '/images/cat2.jpg', (SELECT aid FROM tb_albums WHERE album_name='Niwel 1집'), 'Niwel');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'Leave Me Again'), 0);

INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('Passionate Affair', '255', '/images/cat3.jpg', (SELECT aid FROM tb_albums WHERE album_name='RYYZN 1집'), 'RYYZN');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'Passionate Affair'), 0);
INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('Secrets', '255', '/images/cat4.jpg', (SELECT aid FROM tb_albums WHERE album_name='RYYZN 1집'), 'RYYZN');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'Secrets'), 0);

INSERT INTO tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album) VALUES ('Mas Alla', '255', '/images/cat5.jpg', (SELECT aid FROM tb_albums WHERE album_name='Vince Miranda 1집'), 'Vince Miranda');
INSERT INTO tb_song_likes(tb_songs_sid, cnt) VALUES ((SELECT sid FROM tb_songs WHERE song_name = 'Mas Alla'), 0);