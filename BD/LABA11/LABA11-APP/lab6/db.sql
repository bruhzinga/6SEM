use master;
drop database DB6SEM1_3;
create database DB6SEM1_3;
use DB6SEM1_3;
use Node_19
go 
exec sp_configure 'clr enabled',1;
go
reconfigure;
go
drop table Employee;
drop table Clients;
drop table Products;
drop table Orders;
drop table Orders_products;

create table Employee
(id_employee int primary key not null,
name_employee nvarchar(40) UNIQUE  not null,
lastname_employee nvarchar(20) not null,
)
create table Clients
( id_client int primary key not null,
phone nvarchar(20),
adress nvarchar(20) not null,
);

Create table Products
( id_product int primary key,
product_name nvarchar(20) not null,
price float not null,
);
Create table Orders
(
id_order int identity(1,1) primary key,
order_employee_id  int constraint FK_order_employee foreign  key references Employee(id_employee),
order_client_id int  constraint FK_order_client foreign  key references Clients(id_client),
order_date datetime,
all_price float
);
create table Orders_products(
order_id int references Orders(id_order),
product_id int references Products(id_product),
product_count int check(product_count>0),
constraint orders_products_pk primary key(order_id, product_id)
)

insert into Employee(name_employee, lastname_employee)
		values('ivan','ivanov');
insert into Employee(name_employee, lastname_employee)
		values('petr','petrov');

insert into Clients (phone,adress)
	values ('+375447372777','doma');
insert into Clients (phone,adress)
	values ('+3752932658975', 'nedoma');

insert into Products(product_name,price)
	values('odin',50);
insert into Products(product_name,price)
	values('dva',20);

insert into Orders(order_employee_id,order_client_id,order_date)
	values(1,3,'10-10-2001')
insert into Orders_products(order_id,product_id, product_count)
	values(2,1,2);
select * from Employee;
select * from Clients;
select * from Products;
select * from Orders;
select * from Orders_products;

drop trigger UpdateAllPrice;
GO
CREATE TRIGGER UpdateAllPrice
ON Orders_products
AFTER INSERT
AS
UPDATE Orders
SET all_price += Products.price * Orders_products.product_count  from Orders_products inner join Orders on Orders_products.order_id=Orders.id_order  inner join Products  on Orders_products.product_id=Products.id_product;
go
GO
create view All_Orders as select * from Orders;
go
create index findClient on Clients(phone);
-------------------------CLIENTS-----------------------------------
go
create procedure newClient
			@phone nvarchar(20),
			@adress nvarchar(20)
as	
begin insert into Clients(phone, adress)
	values (@phone,@adress)
	end;
go
exec newClient 'e','eee';
go
create procedure delClient
			@idclient int
			as
			begin delete from Clients where id_client=@idclient
			end;
go
create procedure updatePhone
				@idclient int,
				@phone nvarchar(20)
as 
begin
update Clients set phone = @phone where id_client=@idclient;
end;
exec updatePhone 1, '123456789';
go
create procedure getAllClients
	as
	begin select * from Clients
	end;
go

--------------------------------------EMPLOYEE---------------------------------
create procedure addNewEmployee
			@name nvarchar(40),
			@lastname nvarchar(20)
as begin
insert into Employee (name_employee,lastname_empoyee)
	values(@name,@lastname)
end;
go
create procedure getAllEmployee
as begin 
select * from Employee;
end;
go
create procedure deleteEmployee
			@id int
as begin
delete from Employee where id_employee=@id
end;
go
----------------------------------Products---------------------------------------
create procedure getAllProducts
as begin
select * from Products;
end;
go
--------------------------------ORDERS--------------------------------------
go 
create procedure newOrder
					@order_employee_id int,
					@order_client_id int
as	begin
declare @order_date datetime;
set @order_date = GETDATE();
	insert into Orders(order_employee_id,order_client_id,order_date,all_price)
		values(@order_employee_id,@order_client_id,@order_date,0)
	end;
go 
create procedure addProductinOrder
				@order_id int,
				@product_id int,
				@product_count int
as begin
insert into Orders_products(order_id,product_id, product_count)
	values(@order_id,@product_id,@product_count)
end;
go 
create procedure getAllOrders
as begin
select * from Orders
end;
go
-----------------------------------TASK-----------------------------------------
create procedure spisok_orders
			@datestart datetime,
			@dateend datetime
as begin
select * from Orders where order_date between @datestart and @dateend;
end;
select * from Orders;
exec spisok_orders '10-10-2000','10-10-2022';
----------------------------------------LAB3-----------------------------------------
exec sp_configure 'clr enabled', 1;
reconfigure;
exec sp_configure 'show advanced options', 1;
reconfigure;
exec sp_configure 'clr strict security', 0;
reconfigure;

drop procedure GetOrdersBetweenDate;
drop function ReadTextFile;
drop type zachem;
drop assembly SQLCLRDemo;

create assembly SQLCLRDemo from 'D:\GitHub\6_Sem_DB\labs\lab3\bin\Debug\lab3.dll'  with permission_set = external_access;
go
create function  ReadTextFile (@path nvarchar(256),
                                @pathto nvarchar(256))
    RETURNS bit WITH EXECUTE AS CALLER
as external name SQLCLRDemo.StoredProcedures.ReadTextFile;

go
exec ReadTextFile @path = N'D:\GitHub\6_Sem_DB\labs\lab3\text.txt', @pathto = N'D:\GitHub\6_Sem_DB\labs\lab3\to.txt';
go

create procedure GetOrdersBetweenDate @beginning datetime, @end datetime
as
    external name SQLCLRDemo.StoredProcedures.GetOrdersBetweenDate;
go
exec GetOrdersBetweenDate @beginning ='10-10-2003', @end = '10-10-2022';
go
create type zachem
external name SQLCLRDemo.UserData;
go
declare @s zachem
set @s = '375445555555, dom'
select @s.ToString();
go

-------------------------------------
exec sp_configure 'clr enabled', 1;
go
reconfigure;
go
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
go

EXEC sp_configure 'clr strict security', 1;
RECONFIGURE;
go
exec sp_changedbowner 'sa'
ALTER DATABASE DB6SEM1_3 SET TRUSTWORTHY ON

SELECT * FROM sys.configurations WHERE name LIKE 'clr strict security';

create assembly Hotels_Assembly from 'D:\Labs\DB\Lab3\obj\Debug\Lab3.dll'
with permission_set = external_access;
----------------------------------------------LAB4-----------------------------------
create table [RentingRegion]
(
	RegionId INT IDENTITY(1, 1) CONSTRAINT RentingRegion_PK PRIMARY KEY,
	RegionName nvarchar(50) not null,
	RegionBorder GEOGRAPHY
);
--------------------------
DECLARE @JSON nvarchar(max)
SELECT @JSON = BulkColumn FROM OPENROWSET (BULK 'D:\GitHub\6_Sem_DB\labs\lab4\Employees-formatted.geojson', SINGLE_CLOB) as JSON

insert into Employee(name_employee, lastname_employee, employee_adress)
select
	name_employee, lastname_employee,
	geography::Point(Latitude, Longitude, 4326) AS Geography
from openjson(@JSON, '$.features')
with
(
	name_employee nvarchar(40) '$.properties.name_employee',
	lastname_employee nvarchar(20) '$.properties.lastname_employee',
	Longitude nvarchar(300) '$.geometry.coordinates[0]',
	Latitude nvarchar(300) '$.geometry.coordinates[1]'
)

select * from Employee;
go
------------------------------------------------
DECLARE @JSON nvarchar(max)
SELECT @JSON = BulkColumn FROM OPENROWSET (BULK 'D:\GitHub\6_Sem_DB\labs\lab4\product-formatted.geojson', SINGLE_CLOB) as JSON

insert into Products(product_name, price,product_adress)
select
	product_name, price,
	geography::Point(Latitude, Longitude, 4326) AS Geography
from openjson(@JSON, '$.features')
with
(
	product_name nvarchar(20) '$.properties.product_name',
	price float '$.properties.price',
	Longitude nvarchar(300) '$.geometry.coordinates[0]',
	Latitude nvarchar(300) '$.geometry.coordinates[1]'
)

select * from Products;
go
-------------------------------------------------------
DECLARE @JSON nvarchar(max)
SELECT @JSON = BulkColumn FROM OPENROWSET (BULK 'D:\GitHub\6_Sem_DB\labs\lab4\regions-formatted.geojson', SINGLE_CLOB) as JSON

Insert Into [RentingRegion] (RegionName, RegionBorder)
select
    RegionName,
	geography::STPolyFromText(concat('POLYGON ((', [Coordinates],'))'), 4326) as GEOGRAPHY
from openjson(@JSON, '$')
with
(
	RegionName nvarchar(50) '$.region',
    [Coordinates] nvarchar(max) '$.coordinates'
)
select * from RentingRegion;
-----------------------
go
declare @name_employee nvarchar(40) = 'test10';
declare @lastname_employee nvarchar(20) = 'test10';
declare @employeeregion AS nvarchar(50), @regionBorder AS GEOGRAPHY;

select  @employeeregion = r.RegionName, @regionBorder = r.RegionBorder
from RentingRegion r, Employee e
where r.RegionBorder.STIntersects(e.employee_adress) != 0 and e.name_employee like @name_employee and e.lastname_employee like @lastname_employee--ÔÂÂÒÂ˜ÂÌËÂ

select @employeeregion [employeeregion], @regionBorder [regionBorder];
go
-----------------TEST INDEX----------------------
declare @name_employee nvarchar(40) = 'test10';
declare @lastname_employee nvarchar(20) = 'test10';
declare @employeeregion AS nvarchar(50), @regionBorder AS GEOGRAPHY;
go
declare @product_name nvarchar(20) = 'test10';
select v.*, Products.id_product,
Products.product_name, Products.price, 
Products.product_adress.STDistance(v.employee_adress) [distance] from Employee v
outer apply (
	select c.id_product, c.product_name, c.price, c.product_adress 
	from Products c where c.product_name like @product_name
) Products (id_product, product_name, price, product_adress)
order by [distance]
go
--------------------------TEST INDEX----------------------
declare @name_employee nvarchar(40) = 'test10';
declare @lastname_employee nvarchar(20) = 'test10';
declare @employeeregion AS nvarchar(50), @regionBorder AS GEOGRAPHY;
go
declare @product_name nvarchar(20) = 'test10';
select v.*, Products.id_product,
Products.product_name, Products.price, 
Products.product_adress.STDistance(v.employee_adress) [distance] from Employee v
with(index(empl_index))
outer apply (
	select c.id_product, c.product_name, c.price, c.product_adress 
	from Products c with(index(i_spatail_geog)) where c.product_name like @product_name
) Products (id_product, product_name, price, product_adress)
order by [distance]
go

-----------------------------------------FASTER--------------------------
select * from Products;
drop index product_geo on products;
CREATE spatial INDEX product_geo ON Products(product_adress);
select * from Products where product_name = 'test23';
-----------------------------
drop  index i_spatial_geog on Products;
create spatial index i_spatial_geog
on Products(product_adress)
select * from Products;
select * from Products where product_adress='0xE6100000010CAD8AA14BC4EF4A40FFFFFF7F94A23B40';//«¿œ–Œ—   √≈Œ
select * from sys.spatial_index_tessellations;

-----------------------------
select *from Products where price =5 order by product_name desc;
create index i_spatail_geog ON products (product_name);
create index empl_index on Employee(name_employee);
drop index i_spatail_geog ON products;
drop index empl_index ON Employee;
select * from Employee
update products set price = 6321 where id_product =18
-----------------------------»«Ã≈Õ≈Õ»≈ √≈Œƒ¿ÕÕ€≈’----------------
select * from Products;

go
DECLARE @location varchar(255)='0xE6100000010C61C3D32B65A14440C4B12E6EA3BD5BC0'
DECLARE @binlocation varbinary (max)=CONVERT(varbinary(max), @location, 1)
DECLARE @b geography
SET @b=@binlocation
update Products set product_adress =@b where id_product=5;
--------------------------------ÕŒ–Ã¿À‹Õ€… »Õƒ≈ —---------------------
drop  index i_spatial_geog on Products;
drop  index emlp_index on Employee;
select * from Products;
create spatial index i_spatial_geog on Products(product_adress);
create spatial index emlp_index on Employee(employee_adress);
go
DECLARE @location varchar(255)='0xE6100000010C61C3D32B65A14440C4B12E6EA3BD5BC0'
DECLARE @binlocation varbinary (max)=CONVERT(varbinary(max), @location, 1)
DECLARE @b geography
SET @b=@binlocation
select * from Products where product_adress = @b;
go
select * from Products;
select * from Employee;
update Employee set name_employee = 'jhjg' where id_employee=22;