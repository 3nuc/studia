CREATE OR REPLACE PACKAGE zad4oraz5 AUTHID definer AS
    PROCEDURE reshape_data;

    FUNCTION avg_salary (
        nazwa_stanowiska VARCHAR2
    ) RETURN NUMBER;

END zad4oraz5;
/

CREATE OR REPLACE PACKAGE BODY zad4oraz5 AS

    PROCEDURE reshape_data IS
    BEGIN
        INSERT INTO pracownik (
            surname,
            name,
            birth,
            email,
            hire,
            salary,
            id_stanowiska,
            id_specjalnosci
        )
            SELECT
                temp1.surname,
                temp1.name,
                temp1.birth,
                temp1.email,
                temp1.hire_date,
                temp1.salary,
                stanowisko.id_stanowiska,
                specjalnosc.id_specjalnosci
            FROM
                temp1
                INNER JOIN stanowisko ON temp1.position = stanowisko.nazwa
                INNER JOIN specjalnosc ON temp1.speciality = specjalnosc.nazwa;

    END reshape_data;

    FUNCTION avg_salary (
        nazwa_stanowiska VARCHAR2
    ) RETURN NUMBER IS srednia_pensja NUMBER;
    BEGIN
        SELECT
            avgsal
        INTO srednia_pensja
        FROM
            (
                SELECT
                    AVG(pracownik.salary) as avgsal,
                    pracownik.id_stanowiska as idst
                FROM
                    pracownik
                GROUP BY
                    pracownik.id_stanowiska
            )
            INNER JOIN stanowisko ON stanowisko.id_stanowiska = idst
        WHERE
            stanowisko.nazwa LIKE nazwa_stanowiska;
        RETURN(srednia_pensja);
    END;

END zad4oraz5;

select zad4oraz5.avg_salary ('Education Analyst') from dual;
EXECUTE zad4oraz5.RESHAPE_DATA();