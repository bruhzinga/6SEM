create table Shops(
    id int primary key ,
    name varchar(255) not null,
    address varchar(255) not null,
    phone varchar(255) not null
);

drop table Shops;

create table ShopSales(
    id int primary key,
    shop_id int not null,
    date date not null,
    price int not null,
    foreign key (shop_id) references Shops(id) on delete cascade
);
drop table ShopSales;

insert into Shops values (1, 'SuperShop', 'Dhaka', '01700000000');
insert into ShopSales values (3, 15, '2020-01-01', 1000);

--Создать представление в базе данных SQLite.

create view ShopSalesView as
select Shops.name, Shops.address, Shops.phone, ShopSales.date, ShopSales.price
from Shops
inner join ShopSales on Shops.id = ShopSales.shop_id;

drop view ShopSalesView;

select * from ShopSalesView;

--Создать триггер в базе данных SQLite

create trigger ShopSalesTrigger
after insert on ShopSales
begin
    update ShopSales set price = price + 100 where id = new.id;
end;

insert into ShopSales values (2, 1, '2020-01-01', 1000);
select * from ShopSales;