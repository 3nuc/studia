--porownanie sprzedazy na przestrzeni lat
-- dla danego produktu
-- w kolejnych panstwach
-- z wydatkami na reklame na ten produkt (w danym panstwie)
-- w kolejnych latach



--porownanie wydatkow na reklame oraz sredniego okresu trwania reklamy
-- w kolejnych latach na poziomie sklepu
-- z liczba promocji oferowanych (przez powyzszy sklep)
-- na ten produkt
-- w kolejnych latach

drop table f_sprzedaz;
drop table f_reklama;
drop table w_produkt;
drop table w_panstwo;
drop table w_sklep;
create table w_produkt (
    id_produktu number primary key,
    nazwa varchar2(50)
);

create table w_panstwo (
    id_panstwa number primary key,
    nazwa varchar2(50)
);

create table w_sklep (
    id_sklepu number primary key,
    nazwa varchar2(50)
);
create table f_sprzedaz (
    id_sprzedaz number PRIMARY KEY,
    id_produktu number references w_produkt(id_produktu),
    id_panstwa number references w_panstwo(id_panstwa),
    id_sklepu number references w_sklep(id_sklepu),
    m_rok number(4),
    m_wartosc_sprzedazy number(10,2),
    m_ilosc_promocji number(10)
);

create table f_reklama (
    id_reklamy number primary key,
    id_rpoduktu number references w_produkt(id_produktu),
    id_panstwa number references w_panstwo(id_panstwa),
    id_sklepu number references w_sklep(id_sklepu),
    m_rok number(4),
    m_wartosc_reklamy number(10,2),
    m_sredniokrestrwania number(4)
);

drop sequence sek_f_sprzedaz;
drop sequence sek_f_reklama;

create sequence sek_f_sprzedaz;
create sequence sek_f_reklama;

create or replace trigger t_make_id_sprzedaz before
    insert on f_sprzedaz
    for each row
begin
    :new.id_sprzedaz := sek_f_sprzedaz.nextval;
end;
/
create or replace trigger t_make_id_reklamy before
    insert on f_reklama
    for each row
    begin
        :new.id_reklamy := sek_f_reklama.nextval;
    end;
/
create or replace function f_cena(nowe_id_sklepu number, nowe_id_produktu number) return number
    is
    cena number;
    begin
        select magazyn.cena into cena
        from magazyn
        where magazyn.id_produktu = nowe_id_produktu and magazyn.id_sklepu = nowe_id_sklepu;
        return cena;
    end;
/
create or replace function f_promocja(nowe_id_sklepu number, nowe_id_produktu number, data_zamowienia date) return number
  is
  return_promocja number;
  begin
    select procent_obnizki into return_promocja
    from promocja
    where promocja.id_produktu = nowe_id_produktu AND promocja.id_sklepu = nowe_id_sklepu AND (promocja.data_od<data_zamowienia) AND (promocja.data_DO>data_zamowienia);
    if return_promocja>0 then
        return return_promocja;
    else
        return 0;
    end if;
end;
/
create or replace function f_wartosc_sprzedazy(nowe_id_sklepu number, nowe_id_produktu number, rok number) return number
    is
    wartosc_sprzedazy number;
    begin
        select sum(f_cena(sklep.id_sklepu,produkt.id_produktu)*((100 - (NVL(f_promocja(sklep.id_sklepu, produkt.id_produktu,zamowienie.data_zamowienia),0)))/100)*szczegoly_zamowienia.ilosc) into wartosc_sprzedazy
        from zamowienie join sklep on zamowienie.id_sklepu = sklep.id_sklepu JOIN szczegoly_zamowienia on zamowienie.id_sklepu=szczegoly_zamowienia.id_zamowienia
        join produkt on produkt.id_produktu = szczegoly_zamowienia.id_produktu
        where sklep.id_sklepu = nowe_id_sklepu AND produkt.id_produktu = nowe_id_produktu and extract(YEAR from zamowienie.data_zamowienia)=rok;
        return wartosc_sprzedazy;
    end;
/
create or replace function f_sredni_czas_reklamy(nowe_id_sklepu number, nowe_id_produktu number, rok number) return number
    is
    sr_czas number;
    begin
        select avg(reklama.data_do-reklama.data_od) into sr_czas
        from reklama
        where reklama.id_produktu = nowe_id_produktu AND reklama.id_sklepu = nowe_id_sklepu and (EXTRACT(YEAR FROM reklama.data_od)=ROK);
        return sr_czas;
    end;
 /   
create or replace function f_ilosc_promocji(nowe_id_sklepu number, nowe_id_produktu number, rok number) return number
is
ilosc number;
begin
    select count(*) into ilosc
    from promocja
    where promocja.id_produktu = nowe_id_produktu and promocja.id_sklepu = nowe_id_sklepu and (EXTRACT(year from promocja.data_od)=rok);
    return ilosc;
end;
/
create or replace function f_wartosc_reklamy(nowe_id_sklepu number, nowe_id_produktu number, rok number) return number is
wartosc number;

begin
    select sum(reklama.wartosc_reklamy) into wartosc
    from reklama
    where reklama.id_produktu = nowe_id_produktu AND reklama.nowe_id_sklepu = nowe_id_sklepu AND (extract(year from reklama.data_od)=rok);
    return wartosc;
    end;
   /     
        
create or replace procedure p_zaladuj is
    rok number(4);
    begin
        insert into w_produkt(id_produktu, nazwa)
            select distinct produkt.id_produktu, produkt.nazwa
            from produkt
            where not exists (select wpr.nazwa from w_produkt wpr where produkt.id_produktu = wpr.id_produktu);
        
        insert into w_panstwo(id_panstwa, nazwa)
            select distinct p.id_panstwa, p.nazwa
            from panstwo p
            where not exists (select wp.nazwa from w_panstwo wp where produkt.id_panstwa = wp.id_panstwa);
        insert into w_sklep(id_sklepu, nazwa)
            select distinct s.id_sklepu,nazwa
            from sklep s
            where not exists (select ws.nazwa from w_sklep ws where s.id_sklepu = ws.id_sklepu);
            
        for rok in 2006 .. 2015 loop
            insert into f_sprzedaz (id_produktu,id_panstwa,id_sklepu,m_rok,m_wartosc_sprzedazy, m_ilosc_promocji)
                select distinct p.id_produktu,pa.id_panstwa,s.id_sklepu,rok,NVL(f_wartosc_sprzedazy(s.id_sklepu,p.id_produktu,rok),0),f_ilosc_promocji(S.id_sklepu,p.id_produktu,rok)
                from produkt p, sklep s,panstwo pa
                where s.panstwo = pa.id_panstwa;
                
            insert into f_reklama (id_produktu, id_panstwa, id_sklepu,m_rok,m_wartosc_reklamy, m_sredniokrestrwania)
                select distinct p.id_produktu,pa.id_panstwa, s.id_sklepu,rok,nvl(f_wartosc_reklamy(s.id_sklepu,p.id_produktu,rok),0),f_sredni_czas_reklamy(s.id_sklepu, p.id_produktu,rok)
                from produkt p,sklep s,panstwo pa
                where s.panstwo = pa.id_panstwa;
        end loop;
    end;
   / 
    exec p_zaladuj;

--create table produkt (
--    id_produktu primary key,
--    nazwa
--    typ
--)
    