
Example Koa2 framework

====================================================
npm i
nodemon server.js

================== DB data =========================


DROP DATABASE IF EXISTS `books`;
CREATE DATABASE `books`;
 
USE books;
DROP TABLE IF EXISTS `catalog`;

CREATE TABLE `catalog` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `autor` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `image` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  KEY `title` (`title`),
  KEY `autor` (`autor`),
  KEY `description` (`description`),
  KEY `image` (`image`)
  ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;


DROP PROCEDURE IF EXISTS WhileLoop;
DELIMITER $$
CREATE  PROCEDURE   WhileLoop()
BEGIN
set @start = 1;
set @end = 100000;

SET @returnStr = '';
SET @allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';


WHILE @start < @end
DO
INSERT INTO `catalog` VALUES ( @start, 
CONCAT(@returnStr, substring(@allowedChars, FLOOR(RAND() * LENGTH(@allowedChars) + 1), 1)),  
CONCAT(@returnStr, substring(@allowedChars, FLOOR(RAND() * LENGTH(@allowedChars) + 1), 1)), 
CONCAT(@returnStr, substring(@allowedChars, FLOOR(RAND() * LENGTH(@allowedChars) + 1), 1)), 
CONCAT(@returnStr, substring(@allowedChars, FLOOR(RAND() * LENGTH(@allowedChars) + 1), 1)),
NOW(),NOW());
SET @start = @start + 1;
END WHILE;       
END$$
call WhileLoop();
