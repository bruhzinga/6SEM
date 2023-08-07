-- 1 --
create table report
(
    id      number generated always as identity,
    xml_col xmltype,
    constraint report_pk primary key (id)
);


/*
create procedure generate_xml
as
declare @xml xml;
    set @xml = (select sum(Revenue) [total], getdate() [report_date],Title,Category_Name,Name
                from Sales
                         inner join Books B on Sales.ISBN = B.ISBN
                         inner join Categories C on C.Category_ID = B.Category_ID
                         inner join Authors A on A.Author_ID = B.Author_id
                group by B.Title,C.Category_Name,A.Name
                for xml auto);
insert into report (xml_col)
values (@xml);
go*/
--rewrite to pl/sql


create or replace procedure generate_xml
as
    xml_col xmltype;
begin
    select XMLELEMENT("report",
                      XMLELEMENT("total", sum(Revenue)),
                      XMLELEMENT("report_date", sysdate),
                      XMLELEMENT("books",
                                 XMLELEMENT("book",
                                            XMLELEMENT("title", Title),
                                            XMLELEMENT("category", Category_Name),
                                            XMLELEMENT("author", Name)
                                 )
                      )
    )
    into xml_col
    from Sales
             inner join Books B on Sales.ISBN = B.ISBN
             inner join Categories C on C.Category_ID = B.Category_ID
             inner join Authors A on A.Author_ID = B.Author_id
    group by B.Title, C.Category_Name, A.Name;
    insert into report (xml_col) values (xml_col);
end;






begin
     PUBLISHINGHOUSE.generate_xml();
end;

select *
from report;

-- 4 --
create index report_xml_idx on report (xml_col) indextype is XDB.XMLIndex;


--test the index in oracle
 select * from report where xmlexists('/report[@total=100]' passing xml_col);


-- 5 --
create or replace procedure extract_xml_value(p_report_id int, p_xpath varchar2)
as
    xml_col xmltype;
    xml_val varchar2(100);
begin
    select xml_col
    into xml_col
    from report
    where id = p_report_id;

    select to_char(xml_col.extract('//report/' || p_xpath).getclobval())
    into xml_val
    from dual;

    dbms_output.put_line(xml_val);
end extract_xml_value;
/

begin
    extract_xml_value(21, 'total');
end;