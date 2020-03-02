CREATE OR REPLACE TRIGGER ogranicz_pensje_insert BEFORE
    INSERT ON pracownik2
    FOR EACH ROW
DECLARE
    avg_salary_result NUMBER;
BEGIN
    SELECT
        zad4oraz5.avg_salary(st.nazwa)
    INTO avg_salary_result
    FROM
        stanowisko st
    WHERE
        st.id_stanowiska = :new.id_stanowiska;

    IF ( :new.salary > 1.3 * avg_salary_result ) THEN
        raise_application_error(-20001, 'Pensja nie może być większa o 30% od średniej pensji na danym stanowisku');
    END IF;

END;
/
CREATE OR REPLACE TRIGGER ogranicz_pensje_update BEFORE
    UPDATE ON pracownik2
    FOR EACH ROW
DECLARE
    avg_salary_result NUMBER;
BEGIN
    SELECT
        zad4oraz5.avg_salary(st.nazwa)
    INTO avg_salary_result
    FROM
        stanowisko st
    WHERE
        st.id_stanowiska = :new.id_stanowiska;

    IF ( :new.salary > 1.3 * avg_salary_result ) THEN
        raise_application_error(-20001, 'Pensja nie może być większa o 30% od średniej pensji na danym stanowisku');
    END IF;
END;

INSERT INTO tagisow_artur.pracownik2 (
    surname,
    name,
    birth,
    hire,
    email,
    salary,
    id_stanowiska,
    id_specjalnosci
) VALUES (
    'Julien',
    'Chen ',
    TO_DATE('25-AUG-75', 'DD-MON-RR'),
    TO_DATE('13-JUN-05', 'DD-MON-RR'),
    'julien4@jlee.com',
    999999,
    21,
    21
);
/

UPDATE into PRACOWNIK2
SET
    surname = 'Julien',
    name = 'Chen',
    birth = TO_DATE('25-AUG-75', 'DD-MON-RR'),
    hire = TO_DATE('13-JUN-05', 'DD-MON-RR'),
    email = 'julien4@jlee.com',
    salary = 999999,
    id_stanowiska = 21,
    id_specjalnosci = 21
WHERE
    pracownik2.surname LIKE 'Julien'
    AND pracownik2.name LIKE 'Chen'
        AND pracownik2.birth LIKE TO_DATE('25-AUG-75', 'DD-MON-RR');
/

SELECT * FROM pracownik;

SELECT
            avgsal
        FROM
            (
                SELECT
                    AVG(pracownik.salary) AS avgsal,
                    pracownik.id_stanowiska AS idst
                FROM
                    pracownik
                GROUP BY
                    pracownik.id_stanowiska
            )
            INNER JOIN stanowisko ON stanowisko.id_stanowiska = idst;

