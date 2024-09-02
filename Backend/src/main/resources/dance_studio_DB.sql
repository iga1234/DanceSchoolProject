--DROP VIEW USERS_CLASSES CASCADE;
--DROP VIEW ALL_CLASSES CASCADE;
--DROP VIEW WHICH_TYPE CASCADE;
--DROP VIEW CLASS_WITHOUT_DANCE CASCADE;
--DROP VIEW DATA_INSTRUCTOR CASCADE;
--DROP TABLE SIGN_UP CASCADE;
--DROP TABLE CLASS CASCADE;
--DROP TABLE DANCE CASCADE;
--DROP TABLE USER_AND_ROLE CASCADE;
--DROP TABLE USERS CASCADE;
--DROP TABLE INSTRUCTOR CASCADE;
--DROP TABLE PERSONAL_DATA CASCADE;
--DROP TABLE DANCE_CARD CASCADE;
--DROP TABLE ROLES CASCADE;
--DROP TABLE TYPE_OF_CLASSES CASCADE;





CREATE TABLE ROLES
(ID_ROLES SERIAL CONSTRAINT PK_ROLES PRIMARY KEY,
 ROLE_NAME VARCHAR);

CREATE TABLE TYPE_OF_CLASSES
(ID_TYPE_OF_CLASSES SERIAL CONSTRAINT PK_TYPE_OF_CLASSES PRIMARY KEY,
 NAME_TYPE_OF_CLASSES VARCHAR);

CREATE TABLE DANCE_CARD
(ID_DANCE_CARD SERIAL CONSTRAINT PK_DANCE_CARD PRIMARY KEY,
 EXPIRATION_DATE DATE,
 PRICE FLOAT);

CREATE TABLE PERSONAL_DATA
(ID_PERSONAL_DATA SERIAL CONSTRAINT PK_PERSONAL_DATA PRIMARY KEY,
 NAMEE VARCHAR(10),
 SURNAME VARCHAR(20),
 PHONE_NUM VARCHAR(12),
 EMAIL VARCHAR);

CREATE TABLE INSTRUCTOR
(ID_INSTRUCTOR SERIAL CONSTRAINT PK_INSTRUCTOR PRIMARY KEY,
 ID_PERSONAL_DATA BIGINT CONSTRAINT FK_ID_PERSONAL_DATA REFERENCES PERSONAL_DATA(ID_PERSONAL_DATA) ON DELETE CASCADE);

CREATE TABLE USERS
(USERNAME VARCHAR(20) CONSTRAINT PK_USERNAME PRIMARY KEY,
 USER_PASSWORD VARCHAR(20),
 ID_PERSONAL_DATA BIGINT CONSTRAINT FK_ID_PERSONAL_DATA REFERENCES PERSONAL_DATA(ID_PERSONAL_DATA) ON DELETE CASCADE,
 ID_DANCE_CARD BIGINT CONSTRAINT FK_DANCE_CARD REFERENCES DANCE_CARD(ID_DANCE_CARD) ON DELETE CASCADE);

CREATE TABLE USER_AND_ROLE
(ID_USER_AND_ROLE SERIAL CONSTRAINT PK_ADMIN PRIMARY KEY,
 ID_ROLE INTEGER CONSTRAINT FK_ID_ROLE REFERENCES ROLES(ID_ROLES) ON DELETE CASCADE,
 USERNAME VARCHAR(20) CONSTRAINT FK_USERS REFERENCES USERS(USERNAME) ON DELETE CASCADE);

CREATE TABLE DANCE
(ID_DANCE SERIAL CONSTRAINT PK_DANCE PRIMARY KEY,
 TYPE_OF_DANCE VARCHAR(20),
 ID_TYPE_OF_CLASSES INTEGER CONSTRAINT FK_ID_TYPE_OF_CLASSES REFERENCES TYPE_OF_CLASSES(ID_TYPE_OF_CLASSES) ON DELETE CASCADE);

CREATE TABLE CLASS
(ID_CLASS SERIAL CONSTRAINT PK_CLASS PRIMARY KEY,
 CLASS_DATE DATE,
 START_TIME TIME,
 END_TIME TIME,
 DANCE_LEVEL VARCHAR(5),
 PRICE FLOAT,
 ID_DANCE BIGINT CONSTRAINT FK_ID_DANCE REFERENCES DANCE(ID_DANCE),
 ID_INSTRUCTOR BIGINT CONSTRAINT FK_ID_INSTRUCTOR REFERENCES INSTRUCTOR(ID_INSTRUCTOR) ON DELETE CASCADE);

CREATE TABLE SIGN_UP
(ID_SIGN_UP SERIAL CONSTRAINT PK_SIGN_UP PRIMARY KEY,
 ID_CLASS BIGINT CONSTRAINT FK_ID_CLASS REFERENCES CLASS(ID_CLASS) ON DELETE CASCADE,
 USERNAME VARCHAR(20) CONSTRAINT FK_USERS REFERENCES USERS(USERNAME) ON DELETE CASCADE);

INSERT INTO DANCE_CARD(EXPIRATION_DATE, PRICE) VALUES (date'2020-11-23', 250.00);
INSERT INTO DANCE_CARD(EXPIRATION_DATE, PRICE) VALUES (date'2023-12-23', 230.00);
INSERT INTO DANCE_CARD(EXPIRATION_DATE, PRICE) VALUES (date'2021-09-21', 210.00);
INSERT INTO DANCE_CARD(EXPIRATION_DATE, PRICE) VALUES (date'2023-10-23', 170.00);
INSERT INTO DANCE_CARD(EXPIRATION_DATE, PRICE) VALUES (date'2023-02-15', 280.00);

INSERT INTO TYPE_OF_CLASSES(NAME_TYPE_OF_CLASSES) VALUES ('co tygodniowe zajęcia');
INSERT INTO TYPE_OF_CLASSES(NAME_TYPE_OF_CLASSES) VALUES ('warsztaty');


INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Iga', 'Cieszkowska', '123456789', 'iga1234@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Piotr', 'Kowalski', '123456789', 'piotr.kowalski@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Urszula', 'Kaczmarek', '123456789', 'u.kaczmarek@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Mieczysław', 'Guzik', '123456789', 'guzik4533@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Andrzej', 'Grabowski', '123456789', 'andrzej.grabowski@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Anna', 'Kowalska', '123456789', 'a.kowalska@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Zuzanna', 'Nowak', '123456789', 'zuzanna.nowak@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Lukasz', 'Gruszka', '123456789', 'lgruszka@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Piotr', 'Sikora', '123456789', 'piotr.sikora@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Kamila', 'Wojciechowska', '123456789', 'kamila98@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Krzysztof', 'Wojciechowski', '123456789', 'k.wojciechowski@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Karolina', 'Chmiel', '123456789', 'karolina1200@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Dawid', 'Sidor', '123456789', 'dawid.sidor@wp.pl');
INSERT INTO PERSONAL_DATA(NAMEE, SURNAME, PHONE_NUM, EMAIL) VALUES ('Szymon', 'Karpiński', '123456789', 'skarpinski@wp.pl');


INSERT INTO USERS(USERNAME, USER_PASSWORD, ID_PERSONAL_DATA, ID_DANCE_CARD) VALUES('iga1234', 'password', 1, 1);
INSERT INTO USERS(USERNAME, USER_PASSWORD, ID_PERSONAL_DATA, ID_DANCE_CARD) VALUES('pkowalski', 'password', 2, 2);
INSERT INTO USERS(USERNAME, USER_PASSWORD, ID_PERSONAL_DATA, ID_DANCE_CARD) VALUES('ukaczmarek', 'password', 3, 3);
INSERT INTO USERS(USERNAME, USER_PASSWORD, ID_PERSONAL_DATA, ID_DANCE_CARD) VALUES('guzik4533', 'password', 4, 4);
INSERT INTO USERS(USERNAME, USER_PASSWORD, ID_PERSONAL_DATA, ID_DANCE_CARD) VALUES('andrzej890', 'password', 5, 5);
INSERT INTO USERS(USERNAME, USER_PASSWORD, ID_PERSONAL_DATA, ID_DANCE_CARD) VALUES('kamila98', 'admin', 10, null);
INSERT INTO USERS(USERNAME, USER_PASSWORD, ID_PERSONAL_DATA, ID_DANCE_CARD) VALUES('k.wojciechowski', 'admin', 11, null);
INSERT INTO USERS(USERNAME, USER_PASSWORD, ID_PERSONAL_DATA, ID_DANCE_CARD) VALUES('admin', 'admin', 6, null);


INSERT INTO ROLES(ROLE_NAME) VALUES ('admin');
INSERT INTO ROLES(ROLE_NAME) VALUES ('user');

INSERT INTO INSTRUCTOR(ID_PERSONAL_DATA) VALUES (6);
INSERT INTO INSTRUCTOR(ID_PERSONAL_DATA) VALUES (7);
INSERT INTO INSTRUCTOR(ID_PERSONAL_DATA) VALUES (8);
INSERT INTO INSTRUCTOR(ID_PERSONAL_DATA) VALUES (10);
INSERT INTO INSTRUCTOR(ID_PERSONAL_DATA) VALUES (11);
INSERT INTO INSTRUCTOR(ID_PERSONAL_DATA) VALUES (12);
INSERT INTO INSTRUCTOR(ID_PERSONAL_DATA) VALUES (13);
INSERT INTO INSTRUCTOR(ID_PERSONAL_DATA) VALUES (14);

INSERT INTO USER_AND_ROLE(ID_ROLE, USERNAME) VALUES (1, 'iga1234');
INSERT INTO USER_AND_ROLE(ID_ROLE, USERNAME) VALUES (1, 'admin');
INSERT INTO USER_AND_ROLE(ID_ROLE, USERNAME) VALUES (2, 'pkowalski');
INSERT INTO USER_AND_ROLE(ID_ROLE, USERNAME) VALUES (2, 'ukaczmarek');
INSERT INTO USER_AND_ROLE(ID_ROLE, USERNAME) VALUES (2, 'guzik4533');
INSERT INTO USER_AND_ROLE(ID_ROLE, USERNAME) VALUES (2, 'andrzej890');
INSERT INTO USER_AND_ROLE(ID_ROLE, USERNAME) VALUES (1, 'kamila98');
INSERT INTO USER_AND_ROLE(ID_ROLE, USERNAME) VALUES (1, 'k.wojciechowski');

INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('salsa', 1);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('bachata', 1);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('breakdance', 1);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('taniec uzytkowy', 1);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('taniec ludowy', 1);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('taniec towarzyski', 1);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('tango argentino', 1);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('flamenco', 1);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('zajecia dla dzieci', 1);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('salsa', 2);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('bachata', 2);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('breakdance', 2);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('taniec uzytkowy', 2);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('taniec ludowy', 2);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('taniec towarzyski', 2);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('tango argentino', 2);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('flamenco', 2);
INSERT INTO DANCE(TYPE_OF_DANCE, ID_TYPE_OF_CLASSES) VALUES ('zajecia dla dzieci', 2);


INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-23' , time'11:30:00', time'12:30:00', 'p0', null, 3, 1);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-25', time'09:30:00', time'10:30:00', 'p1', null, 5, 2);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-25', time'10:45:00', time'11:45:00', 'p2', null, 6, 3);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-26', time'13:30:00', time'14:30:00', 'p3', null, 1, 4);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-27', time'12:30:00', time'13:30:00', 's1', null, 8, 5);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-28', time'09:00:00', time'12:15:00', 'open', 150.00, 10, 4);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-29', time'09:30:00', time'14:30:00', 'open', 120.00, 11, 5);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-26' , time'12:30:00', time'13:30:00', 'p1', null, 3, 1);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-26', time'11:15:00', time'12:15:00', 'p0', null, 7, 5);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-23', time'12:45:00', time'13:45:00', 'p2', null, 6, 2);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-24', time'11:30:00', time'12:30:00', 'p3', null, 8, 4);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-27', time'09:30:00', time'10:30:00', 's2', null, 9, 5);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-24' , time'13:30:00', time'14:45:00', 'p2', null, 2, 4);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-25', time'12:30:00', time'13:30:00', 'p3', null, 4, 3);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-23', time'09:30:00', time'10:30:00', 'p0', null, 3, 2);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-24', time'09:45:00', time'10:45:00', 's1', null, 2, 1);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-27', time'11:30:00', time'12:30:00', 's1', null, 1, 3);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-22', time'09:00:00', time'13:30:00', 'open', 100.00, 18, 4);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-02-04', time'09:30:00', time'14:30:00', 'open', 140.00, 11, 1);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-02-05', time'13:30:00', time'16:00:00', 'open', 150.00, 12, 2);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-02-11', time'09:30:00', time'14:30:00', 'open', 130.00, 13, 3);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-02-18', time'10:00:00', time'15:00:00', 'open', 145.00, 14, 4);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-02-12', time'09:30:00', time'14:30:00', 'open', 200.00, 15, 5);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-28', time'12:30:00', time'15:45:00', 'open', 160.00, 16, 4);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-01-22', time'13:30:00', time'16:30:00', 'open', 180.00, 16, 2);
INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES (date '2023-02-05', time'09:30:00', time'13:15:00', 'open', 135.00, 17, 5);



INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (1, 'iga1234');
INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (2, 'pkowalski');
INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (1, 'ukaczmarek');
INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (4, 'guzik4533');
INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (3, 'iga1234');
INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (10, 'iga1234');
INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (6, 'iga1234');
INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (16, 'iga1234');
INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (14, 'iga1234');
INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (7, 'iga1234');
INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (20, 'iga1234');
INSERT INTO SIGN_UP(ID_CLASS, USERNAME) VALUES (8, 'iga1234');



CREATE VIEW DATA_INSTRUCTOR AS SELECT id_instructor, namee, surname FROM personal_data inner join instructor ON personal_data.id_personal_data = instructor.id_personal_data;
CREATE VIEW CLASS_WITHOUT_DANCE AS (SELECT id_class, CLASS_DATE, dance_level, start_time,end_time, namee, surname, id_dance, PRICE, DATA_INSTRUCTOR.id_instructor FROM class inner join data_instructor ON class.id_instructor=data_instructor.id_instructor);
CREATE VIEW WHICH_TYPE AS SELECT id_dance, TYPE_OF_DANCE, NAME_TYPE_OF_CLASSES, TYPE_OF_CLASSES.ID_TYPE_OF_CLASSES FROM TYPE_OF_CLASSES inner join dance ON TYPE_OF_CLASSES.id_type_of_classes=dance.ID_TYPE_OF_CLASSES;
CREATE VIEW ALL_CLASSES AS SELECT id_class, TYPE_OF_DANCE, NAME_TYPE_OF_CLASSES, CLASS_DATE, dance_level, start_time,end_time, namee, surname, ID_TYPE_OF_CLASSES, PRICE, WHICH_TYPE.id_dance, id_instructor FROM WHICH_TYPE INNER JOIN CLASS_WITHOUT_DANCE ON WHICH_TYPE.id_dance=CLASS_WITHOUT_DANCE.id_dance;
CREATE VIEW USERS_CLASSES AS SELECT sign_up.id_class, username, TYPE_OF_DANCE, NAME_TYPE_OF_CLASSES, CLASS_DATE, dance_level, start_time,end_time, namee, surname, ID_TYPE_OF_CLASSES FROM ALL_CLASSES INNER JOIN SIGN_UP ON ALL_CLASSES.id_class=SIGN_UP.id_class;
CREATE VIEW ROLE_OF_USER AS SELECT ID_ROLE, USERS.USERNAME, USER_PASSWORD, ID_DANCE_CARD FROM USERS INNER JOIN USER_AND_ROLE ON USERS.USERNAME = USER_AND_ROLE.USERNAME;
