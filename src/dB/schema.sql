DROP DATABASE IF EXISTS medical_image;	

CREATE DATABASE medical_image;

USE medical_image;

CREATE TABLE images(
	image_name varchar NOT NULL,
	annotations varchar,
	PRIMARY KEY(image_name)
);
