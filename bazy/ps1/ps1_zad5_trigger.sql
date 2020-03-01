DROP TRIGGER ogranicz_pensje;

CREATE OR REPLACE TRIGGER ogranicz_pensje BEFORE
    INSERT ON pracownik
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

INSERT INTO tagisow_artur.pracownik (
    id_pracownika,
    surname,
    name,
    birth,
    hire,
    email,
    salary,
    id_stanowiska,
    id_specjalnosci
) VALUES (
    308,
    'Julien',
    'Chen ',
    TO_DATE('25-AUG-75', 'DD-MON-RR'),
    TO_DATE('13-JUN-05', 'DD-MON-RR'),
    'julien4@jlee.com',
    999999,
    21,
    21
);

SELECT
    *
FROM
    pracownik;