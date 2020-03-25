drop table szczegoly_zamowienia;
drop table zamowienie;
drop table magazyn;
drop table promocja;
drop table reklama;
drop table klient;
drop table produkt;
drop table sklep;
drop table platnosc;
drop table profil_klienta;
drop table panstwo;
drop table typ_produktu;


create table platnosc(
id_platnosci NUMBER PRIMARY KEY,
opis VARCHAR2(20));

create table profil_klienta(
id_profilu NUMBER PRIMARY KEY,
opis VARCHAR2(20));

create table panstwo(
id_panstwa NUMBER PRIMARY KEY,
nazwa VARCHAR2(30));

create table typ_produktu(
id_typu NUMBER PRIMARY KEY,
opis VARCHAR2(30));

create table produkt(
id_produktu NUMBER PRIMARY KEY,
nazwa VARCHAR2(30),
typ NUMBER REFERENCES typ_produktu(id_typu));

create table sklep(
id_sklepu NUMBER PRIMARY KEY,
nazwa VARCHAR2(30),
ulica VARCHAR2(30),
miejscowosc VARCHAR2(30),
wojewodztwo VARCHAR2(30),
panstwo NUMBER REFERENCES panstwo(id_panstwa));

create table klient(
id_klienta NUMBER PRIMARY KEY,
imie VARCHAR2(30),
nazwisko VARCHAR2(30),
data_urodzenia DATE,
ulica VARCHAR2(30),
miejscowosc VARCHAR2(30),
kod_pocztowy VARCHAR2(10),
wojewodztwo VARCHAR2(30),
plec VARCHAR2(1),
panstwo NUMBER REFERENCES panstwo(id_panstwa),
id_profilu NUMBER REFERENCES profil_klienta(id_profilu));

create table reklama(
id_reklamy NUMBER PRIMARY KEY,
data_od DATE,
data_do DATE,
wartosc_reklamy NUMBER(6,2),
id_produktu NUMBER REFERENCES produkt(id_produktu),
id_sklepu NUMBER REFERENCES sklep(id_sklepu));

create table magazyn(
id_magazynu NUMBER PRIMARY KEY,
ilosc NUMBER,
cena NUMBER(6,2),
id_produktu NUMBER REFERENCES produkt(id_produktu),
id_sklepu NUMBER REFERENCES sklep(id_sklepu));

create table zamowienie(
id_zamowienia NUMBER PRIMARY KEY,
data_zamowienia DATE,
id_klienta NUMBER REFERENCES klient(id_klienta),
id_sklepu NUMBER REFERENCES sklep(id_sklepu),
platnosc NUMBER REFERENCES platnosc(id_platnosci));

create table szczegoly_zamowienia(
id_zamowienia NUMBER REFERENCES zamowienie(id_zamowienia),
id_produktu NUMBER REFERENCES produkt(id_produktu),
ilosc NUMBER, 
PRIMARY KEY(id_zamowienia,id_produktu));


create table promocja(
id_promocji NUMBER PRIMARY KEY,
data_od DATE,
data_do DATE,
procent_obnizki NUMBER(4,2),
id_produktu NUMBER REFERENCES produkt(id_produktu),
id_sklepu NUMBER REFERENCES sklep(id_sklepu));


INSERT INTO platnosc VALUES(1, 'przelew');
INSERT INTO platnosc VALUES(2, 'karta');
INSERT INTO platnosc VALUES(3, 'gotowka');

INSERT INTO profil_klienta VALUES(1, 'indywidualny');
INSERT INTO profil_klienta VALUES(2, 'hurt');

INSERT INTO panstwo VALUES(1, 'Polska');
INSERT INTO panstwo VALUES(2, 'Szwecja');
INSERT INTO panstwo VALUES(3, 'Norwegia');
INSERT INTO panstwo VALUES(4, 'Estonia');
INSERT INTO panstwo VALUES(5, 'Finlandia');
INSERT INTO panstwo VALUES(6, 'Lotwa');
INSERT INTO panstwo VALUES(7, 'Litwa');
INSERT INTO panstwo VALUES(8, 'Niemcy');
INSERT INTO panstwo VALUES(9, 'Francja');
INSERT INTO panstwo VALUES(10, 'Irlandia');

INSERT INTO typ_produktu VALUES(1, 'Ksiazki');
INSERT INTO typ_produktu VALUES(2, 'DVD');
INSERT INTO typ_produktu VALUES(3, 'Audioksiazki');
INSERT INTO typ_produktu VALUES(4, 'Zabawki');
INSERT INTO typ_produktu VALUES(5, 'Kosmetyki');

INSERT INTO produkt VALUES(1, 'Ksia1', 1);
INSERT INTO produkt VALUES(2, 'Ksia2', 1);
INSERT INTO produkt VALUES(3, 'Ksia3', 1);
INSERT INTO produkt VALUES(4, 'Ksia4', 1);
INSERT INTO produkt VALUES(5, 'Ksia5', 1);

INSERT INTO produkt VALUES(6, 'DVD1', 2);
INSERT INTO produkt VALUES(7, 'DVD2', 2);
INSERT INTO produkt VALUES(8, 'DVD3', 2);
INSERT INTO produkt VALUES(9, 'DVD4', 2);
INSERT INTO produkt VALUES(10, 'DVD5', 2);

INSERT INTO produkt VALUES(11, 'AudioKsiaz1', 3);
INSERT INTO produkt VALUES(12, 'AudioKsiaz2', 3);
INSERT INTO produkt VALUES(13, 'AudioKsiaz3', 3);
INSERT INTO produkt VALUES(14, 'AudioKsiaz4', 3);
INSERT INTO produkt VALUES(15, 'AudioKsiaz5', 3);

INSERT INTO produkt VALUES(16, 'Zab1', 4);
INSERT INTO produkt VALUES(17, 'Zab2', 4);
INSERT INTO produkt VALUES(18, 'Zab3', 4);
INSERT INTO produkt VALUES(19, 'Zab4', 4);
INSERT INTO produkt VALUES(20, 'Zab5', 4);

INSERT INTO produkt VALUES(21, 'Kos1', 5);
INSERT INTO produkt VALUES(22, 'Kos2', 5);
INSERT INTO produkt VALUES(23, 'Kos3', 5);
INSERT INTO produkt VALUES(24, 'Kos4', 5);
INSERT INTO produkt VALUES(25, 'Kos5', 5);

INSERT INTO sklep VALUES(1, 'Sklep1', null, null , null, 1);
INSERT INTO sklep VALUES(2, 'Sklep2', null, null , null, 1);
INSERT INTO sklep VALUES(3, 'Sklep3', null, null , null, 1);
INSERT INTO sklep VALUES(4, 'Sklep4', null, null , null, 1);
INSERT INTO sklep VALUES(5, 'Sklep5', null, null , null, 1);
INSERT INTO sklep VALUES(6, 'Sklep6', null, null , null, 2);
INSERT INTO sklep VALUES(7, 'Sklep7', null, null , null, 2);
INSERT INTO sklep VALUES(8, 'Sklep8', null, null , null, 2);
INSERT INTO sklep VALUES(9, 'Sklep9', null, null , null, 2);
INSERT INTO sklep VALUES(10, 'Sklep10', null, null , null, 2);
INSERT INTO sklep VALUES(11, 'Sklep11', null, null , null, 3);
INSERT INTO sklep VALUES(12, 'Sklep12', null, null , null, 3);
INSERT INTO sklep VALUES(13, 'Sklep13', null, null , null, 3);
INSERT INTO sklep VALUES(14, 'Sklep14', null, null , null, 3);
INSERT INTO sklep VALUES(15, 'Sklep15', null, null , null, 3);
INSERT INTO sklep VALUES(16, 'Sklep16', null, null , null, 4);
INSERT INTO sklep VALUES(17, 'Sklep17', null, null , null, 4);
INSERT INTO sklep VALUES(18, 'Sklep18', null, null , null, 4);
INSERT INTO sklep VALUES(19, 'Sklep19', null, null , null, 4);
INSERT INTO sklep VALUES(20, 'Sklep20', null, null , null, 4);

INSERT INTO klient
VALUES (1001, 'MORALES', 'BONITA', to_date('01-01-1970','mm-dd-yyyy'), 'P.O. BOX 651', 'EASTPOINT',  '32328', 'FL', 'F', 1, 1);
INSERT INTO klient
VALUES (1002, 'MORALES', 'JOHN', to_date('01-01-1972','mm-dd-yyyy'), 'P.O. BOX 651', 'EASTPOINT',  '32328', 'FL', 'M', 2, 2);
INSERT INTO klient
VALUES (1003, 'SMITH', 'BONITA', to_date('01-01-1973','mm-dd-yyyy'), 'P.O. BOX 651', 'EASTPOINT',  '32328', 'FL', 'F', 3, 1);
INSERT INTO klient
VALUES (1004, 'RAS', 'BONITA', to_date('01-01-1974','mm-dd-yyyy'), 'P.O. BOX 651', 'EASTPOINT',  '32328', 'FL', 'F', 4, 2);

INSERT INTO reklama VALUES(1, to_date('12-12-2007','MM-DD-YYYY'), to_date('12-31-2007','MM-DD-YYYY'), 120.5, 1 , 1);
INSERT INTO reklama VALUES(2, to_date('12-12-2008','MM-DD-YYYY'), to_date('12-31-2008','MM-DD-YYYY'), 140.5, 2 , 1);
INSERT INTO reklama VALUES(3, to_date('12-12-2009','MM-DD-YYYY'), to_date('12-31-2009','MM-DD-YYYY'), 130.5, 3 , 1);
INSERT INTO reklama VALUES(4, to_date('12-12-2010','MM-DD-YYYY'), to_date('12-31-2010','MM-DD-YYYY'), 190.5, 4 , 1);
INSERT INTO reklama VALUES(5, to_date('12-12-2011','MM-DD-YYYY'), to_date('12-31-2011','MM-DD-YYYY'), 220.0, 5 , 1);

INSERT INTO reklama VALUES(6, to_date('12-12-2011','MM-DD-YYYY'), to_date('12-31-2011','MM-DD-YYYY'), 120.5, 1 , 2);
INSERT INTO reklama VALUES(7, to_date('12-12-2012','MM-DD-YYYY'), to_date('12-31-2012','MM-DD-YYYY'), 150.5, 2 , 2);
INSERT INTO reklama VALUES(8, to_date('12-12-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 200.5, 3 , 2);
INSERT INTO reklama VALUES(9, to_date('12-12-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 2000.5, 4 , 2);
INSERT INTO reklama VALUES(10, to_date('12-12-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 220.0, 5 , 2);

INSERT INTO reklama VALUES(11, to_date('12-12-2010','MM-DD-YYYY'), to_date('12-31-2010','MM-DD-YYYY'), 1200.5, 1 , 13);
INSERT INTO reklama VALUES(12, to_date('12-12-2011','MM-DD-YYYY'), to_date('12-31-2011','MM-DD-YYYY'), 140.5, 2 , 13);
INSERT INTO reklama VALUES(13, to_date('12-12-2012','MM-DD-YYYY'), to_date('12-31-2012','MM-DD-YYYY'), 130.5, 3 , 13);
INSERT INTO reklama VALUES(14, to_date('12-12-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 1000.5, 4 , 13);
INSERT INTO reklama VALUES(15, to_date('12-12-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 220.0, 5 , 13);

INSERT INTO reklama VALUES(16, to_date('12-12-2011','MM-DD-YYYY'), to_date('12-31-2011','MM-DD-YYYY'), 1200.5, 1 , 14);
INSERT INTO reklama VALUES(17, to_date('12-12-2011','MM-DD-YYYY'), to_date('12-31-2011','MM-DD-YYYY'), 140.5, 2 , 14);
INSERT INTO reklama VALUES(18, to_date('12-12-2012','MM-DD-YYYY'), to_date('12-31-2012','MM-DD-YYYY'), 1300.5, 3 , 14);
INSERT INTO reklama VALUES(19, to_date('12-12-2012','MM-DD-YYYY'), to_date('12-31-2012','MM-DD-YYYY'), 100.5, 4 , 14);
INSERT INTO reklama VALUES(20, to_date('12-12-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 2200.0, 5 , 14);

INSERT INTO reklama VALUES(21, to_date('12-12-2011','MM-DD-YYYY'), to_date('12-31-2011','MM-DD-YYYY'), 12.5, 1 , 15);
INSERT INTO reklama VALUES(22, to_date('12-12-2012','MM-DD-YYYY'), to_date('12-31-2012','MM-DD-YYYY'), 14.5, 2 , 15);
INSERT INTO reklama VALUES(23, to_date('12-12-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 13.5, 3 , 15);
INSERT INTO reklama VALUES(24, to_date('12-12-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 10.5, 4 , 15);
INSERT INTO reklama VALUES(25, to_date('12-12-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 22.0, 5 , 15);


INSERT INTO magazyn VALUES(1, 1000, 12.5, 1 , 1);
INSERT INTO magazyn VALUES(2, 2000, 14.5, 2 , 1);
INSERT INTO magazyn VALUES(3, 1000, 13.5, 3 , 1);
INSERT INTO magazyn VALUES(4, 3000, 19.5, 4 , 1);
INSERT INTO magazyn VALUES(5, 1000, 22.0, 5 , 1);

INSERT INTO magazyn VALUES(6, 1000, 12.5, 1 , 2);
INSERT INTO magazyn VALUES(7, 2000, 15.5, 2 , 2);
INSERT INTO magazyn VALUES(8, 1000, 20.5, 3 , 2);
INSERT INTO magazyn VALUES(9, 3000, 20.5, 4 , 2);
INSERT INTO magazyn VALUES(10, 1000, 22.0, 5 , 2);

INSERT INTO magazyn VALUES(11, 1000, 12.5, 1 , 13);
INSERT INTO magazyn VALUES(12, 2000, 14.5, 2 , 13);
INSERT INTO magazyn VALUES(13, 1000, 13.5, 3 , 13);
INSERT INTO magazyn VALUES(14, 3000, 10.5, 4 , 13);
INSERT INTO magazyn VALUES(15, 1000, 22.0, 5 , 13);

INSERT INTO magazyn VALUES(16, 1000, 12.5, 1 , 14);
INSERT INTO magazyn VALUES(17, 2000, 14.5, 2 , 14);
INSERT INTO magazyn VALUES(18, 1000, 13.5, 3 , 14);
INSERT INTO magazyn VALUES(19, 3000, 10.5, 4 , 14);
INSERT INTO magazyn VALUES(20, 1000, 22.0, 5 , 14);

INSERT INTO magazyn VALUES(21, 1000, 12.5, 1 , 15);
INSERT INTO magazyn VALUES(22, 2000, 14.5, 2 , 15);
INSERT INTO magazyn VALUES(23, 1000, 13.5, 3 , 15);
INSERT INTO magazyn VALUES(24, 3000, 10.5, 4 , 15);
INSERT INTO magazyn VALUES(25, 1000, 22.0, 5 , 15);

INSERT INTO zamowienie VALUES(1, to_date('01-12-2010','MM-DD-YYYY'), 1001, 1 , 1);
INSERT INTO zamowienie VALUES(2, to_date('02-12-2011','MM-DD-YYYY'), 1001, 1 , 2);
INSERT INTO zamowienie VALUES(3, to_date('01-12-2012','MM-DD-YYYY'), 1002, 2 , 1);
INSERT INTO zamowienie VALUES(4, to_date('02-12-2013','MM-DD-YYYY'), 1002, 3 , 2);
INSERT INTO zamowienie VALUES(5, to_date('03-12-2014','MM-DD-YYYY'), 1003, 4 , 1);
INSERT INTO zamowienie VALUES(6, to_date('05-12-2010','MM-DD-YYYY'), 1001, 1 , 1);
INSERT INTO zamowienie VALUES(7, to_date('07-12-2011','MM-DD-YYYY'), 1001, 1 , 2);
INSERT INTO zamowienie VALUES(8, to_date('08-12-2012','MM-DD-YYYY'), 1002, 2 , 1);
INSERT INTO zamowienie VALUES(9, to_date('02-12-2013','MM-DD-YYYY'), 1002, 3 , 2);
INSERT INTO zamowienie VALUES(10, to_date('09-12-2014','MM-DD-YYYY'), 1003, 4 , 1);
INSERT INTO zamowienie VALUES(11, to_date('04-12-2010','MM-DD-YYYY'), 1001, 1 , 1);
INSERT INTO zamowienie VALUES(12, to_date('02-12-2011','MM-DD-YYYY'), 1001, 11 , 2);
INSERT INTO zamowienie VALUES(13, to_date('11-12-2012','MM-DD-YYYY'), 1002, 12 , 1);
INSERT INTO zamowienie VALUES(14, to_date('02-12-2013','MM-DD-YYYY'), 1002, 13 , 2);
INSERT INTO zamowienie VALUES(15, to_date('03-12-2014','MM-DD-YYYY'), 1003, 14 , 1);

INSERT INTO szczegoly_zamowienia VALUES(1, 1 , 10);
INSERT INTO szczegoly_zamowienia VALUES(1, 2 , 10);
INSERT INTO szczegoly_zamowienia VALUES(1, 3 , 20);
INSERT INTO szczegoly_zamowienia VALUES(2, 1 , 10);
INSERT INTO szczegoly_zamowienia VALUES(2, 2 , 10);
INSERT INTO szczegoly_zamowienia VALUES(2, 3 , 20);
INSERT INTO szczegoly_zamowienia VALUES(3, 1 , 10);
INSERT INTO szczegoly_zamowienia VALUES(3, 2 , 10);
INSERT INTO szczegoly_zamowienia VALUES(3, 3 , 20);
INSERT INTO szczegoly_zamowienia VALUES(4, 4 , 10);
INSERT INTO szczegoly_zamowienia VALUES(4, 5 , 10);
INSERT INTO szczegoly_zamowienia VALUES(4, 6 , 20);
INSERT INTO szczegoly_zamowienia VALUES(5, 7 , 20);
INSERT INTO szczegoly_zamowienia VALUES(6, 8 , 20);
INSERT INTO szczegoly_zamowienia VALUES(7, 9 , 20);
INSERT INTO szczegoly_zamowienia VALUES(8, 10 , 10);
INSERT INTO szczegoly_zamowienia VALUES(9, 11 , 20);
INSERT INTO szczegoly_zamowienia VALUES(10, 12 , 40);
INSERT INTO szczegoly_zamowienia VALUES(11, 13 , 20);
INSERT INTO szczegoly_zamowienia VALUES(12, 14 , 10);
INSERT INTO szczegoly_zamowienia VALUES(13, 15 , 20);
INSERT INTO szczegoly_zamowienia VALUES(14, 16 , 20);
INSERT INTO szczegoly_zamowienia VALUES(15, 20 , 10);



INSERT INTO promocja VALUES(1, to_date('12-12-2007','MM-DD-YYYY'), to_date('12-31-2007','MM-DD-YYYY'), 5, 1 , 1);
INSERT INTO promocja VALUES(2, to_date('12-12-2008','MM-DD-YYYY'), to_date('12-31-2008','MM-DD-YYYY'), 5, 2 , 1);
INSERT INTO promocja VALUES(3, to_date('12-12-2009','MM-DD-YYYY'), to_date('12-31-2009','MM-DD-YYYY'), 5, 3 , 1);
INSERT INTO promocja VALUES(4, to_date('12-12-2010','MM-DD-YYYY'), to_date('12-31-2010','MM-DD-YYYY'), 5, 4 , 1);
INSERT INTO promocja VALUES(5, to_date('12-12-2011','MM-DD-YYYY'), to_date('12-31-2011','MM-DD-YYYY'), 2, 5 , 1);

INSERT INTO promocja VALUES(6, to_date('12-01-2011','MM-DD-YYYY'), to_date('12-31-2011','MM-DD-YYYY'), 10, 1 , 2);
INSERT INTO promocja VALUES(7, to_date('12-04-2012','MM-DD-YYYY'), to_date('12-31-2012','MM-DD-YYYY'), 15, 2 , 2);
INSERT INTO promocja VALUES(8, to_date('12-05-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 4, 3 , 2);
INSERT INTO promocja VALUES(9, to_date('12-08-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 5, 4 , 2);
INSERT INTO promocja VALUES(10, to_date('12-09-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 30, 5 , 2);

INSERT INTO promocja VALUES(11, to_date('12-11-2009','MM-DD-YYYY'), to_date('12-31-2009','MM-DD-YYYY'), 5, 1 , 13);
INSERT INTO promocja VALUES(12, to_date('12-01-2011','MM-DD-YYYY'), to_date('12-01-2011','MM-DD-YYYY'), 40, 2 , 13);
INSERT INTO promocja VALUES(13, to_date('12-12-2012','MM-DD-YYYY'), to_date('12-31-2012','MM-DD-YYYY'), 8, 3 , 13);
INSERT INTO promocja VALUES(14, to_date('12-12-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 4, 4 , 13);
INSERT INTO promocja VALUES(15, to_date('12-12-2013','MM-DD-YYYY'), to_date('12-31-2013','MM-DD-YYYY'), 2, 5 , 13);
