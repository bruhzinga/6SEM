-- 1 --
create table report
(
    id      int primary key identity (1, 1),
    xml_col xml
);

drop table report;

-- 2-3 --
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
go

exec generate_xml;

select *
from report;

-- 4 --
create primary xml index xml_col_index
    on report (xml_col);

--test the index
select *
from report
where xml_col.exist('/B/@*[local-name()="total"]') = 1;


create xml index second_xml_col_index
    on report (xml_col) using xml index xml_col_index for path;

-- 5 --
create procedure extract_xml_value @xmlValue nvarchar(100)
as
begin
    select [id],
           [xml_col].value('(/B/@*[local-name()=sql:variable("@xmlValue")])[1]', 'NVARCHAR(100)') as extractedValue
    from [report]
    where [xml_col].exist('/B/@*[local-name()=sql:variable("@xmlValue")]') = 1
end
go

exec extract_xml_value 'total';
