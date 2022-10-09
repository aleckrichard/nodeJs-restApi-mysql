CREATE DATABASE IF NOT EXISTS noderestapimysql;

USE noderestapimysql;

CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NULL,
  `salary` int NULL
);