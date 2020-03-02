DROP TABLE pracownik2;

DROP TABLE stanowisko;

DROP TABLE specjalnosc;

DROP SEQUENCE SEK_STANOWISKO;

DROP SEQUENCE SEK_SPECJALNOSC;

DROP SEQUENCE SEK_PRACOWNIK;

CREATE TABLE stanowisko (
    id_stanowiska   NUMBER PRIMARY KEY,
    nazwa           VARCHAR(50)
);

CREATE TABLE specjalnosc (
    id_specjalnosci   NUMBER PRIMARY KEY,
    nazwa             VARCHAR(50)
);

CREATE TABLE pracownik (
    id_pracownika   NUMBER PRIMARY KEY,
    surname         VARCHAR(50),
    name            VARCHAR(50),
    birth           DATE NOT NULL,
    hire            DATE NOT NULL,
    email           VARCHAR(50),
    salary          NUMBER NOT NULL,
    id_stanowiska
        REFERENCES stanowisko ( id_stanowiska ),
    id_specjalnosci
        REFERENCES specjalnosc ( id_specjalnosci )
);

CREATE SEQUENCE sek_stanowisko;
/
CREATE SEQUENCE sek_specjalnosc;
/
CREATE SEQUENCE sek_pracownik;
/

CREATE OR REPLACE TRIGGER t_ustaw_id_stanowisko BEFORE
    INSERT ON stanowisko
    FOR EACH ROW
BEGIN
    :new.id_stanowiska := sek_stanowisko.nextval;
END;
/
CREATE OR REPLACE TRIGGER t_ustaw_id_specjalnosc BEFORE
    INSERT ON specjalnosc
    FOR EACH ROW
BEGIN
    :new.id_specjalnosci := sek_specjalnosc.nextval;
END;
/
CREATE OR REPLACE TRIGGER t_ustaw_id_pracownik BEFORE
    INSERT ON pracownik
    FOR EACH ROW
BEGIN
    :new.id_pracownika := sek_pracownik.nextval;
END;
/

SELECT
    *
FROM
    pracownik;

SELECT
    *
FROM
    stanowisko;

SELECT
    *
FROM
    specjalnosc;

EXECUTE zad4oraz5.reshape_data();

zad4oraz5.avg_salary('Education Analyst');

SELECT * FROM temp1;
SELECT * from pracownik;

SELECT * FROM V$SESSION WHERE STATUS = 'ACTIVE';