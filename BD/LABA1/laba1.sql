create database PublishingHouse;
use  PublishingHouse;

CREATE TABLE Categories (
  Category_ID int IDENTITY(1,1) PRIMARY KEY,
  Category_name varchar(30) NOT NULL
);

CREATE TABLE Books (
  ISBN varchar(20) NOT NULL PRIMARY KEY,
  Title varchar(100) NOT NULL,
  Author_id int NOT NULL,
  Publication_date date NOT NULL,
  Category_ID int NOT NULL,
  Description varchar(1000) NOT NULL,
  Publisher_ID int NOT NULL,
  Distributor_ID int NOT NULL,
  FOREIGN KEY (Category_ID) REFERENCES Categories(Category_ID),
  FOREIGN KEY (Publisher_ID) REFERENCES Publishers(Publisher_ID),
  FOREIGN KEY (Distributor_ID) REFERENCES Distributors(Distributor_ID),
  FOREIGN KEY (Author_id) REFERENCES Authors(Author_ID)
);


CREATE TABLE Authors (
  Author_ID int IDENTITY(1,1) PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Date_of_birth date NOT NULL,
  Bio varchar(1000) NOT NULL,
  Nationality varchar(30) NOT NULL
);


CREATE TABLE Publishers (
  Publisher_ID int IDENTITY(1,1) PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Address varchar(100) NOT NULL,
  Contact_info varchar(50) NOT NULL
);

CREATE TABLE Distributors (
  Distributor_ID int IDENTITY(1,1) PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Address varchar(100) NOT NULL,
  Contact_info varchar(50) NOT NULL
);

CREATE TABLE Sales (
  Sales_ID int IDENTITY(1,1) PRIMARY KEY,
  ISBN varchar(20) NOT NULL,
  Sales_date date NOT NULL,
  Copies_sold int NOT NULL,
  Revenue decimal(10,2) NOT NULL,
  FOREIGN KEY (ISBN) REFERENCES Books(ISBN)
);

CREATE TABLE Inventory (
  Inventory_ID int IDENTITY(1,1) PRIMARY KEY,
  ISBN varchar(20) NOT NULL,
  Copies_in_stock int NOT NULL,
  Location varchar(50) NOT NULL,
  FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
);

CREATE TABLE Orders (
  Order_ID int IDENTITY(1,1) PRIMARY KEY,
  ISBN varchar(20) NOT NULL,
  Order_date date NOT NULL,
  Copies_ordered int NOT NULL,
  Customer_ID int NOT NULL,
  FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
  FOREIGN KEY (Customer_ID) REFERENCES Customers(Customer_ID)
);


select Name,BIO from  Authors;



---------------INDEXES----------------------------------------
--foreign keys for books table
CREATE  NONCLUSTERED  INDEX IX_Books_Category_ID ON Books (Category_ID)   where Category_ID >0 AND Category_ID<10
CREATE  NONCLUSTERED INDEX IX ON Authors (Name,BIO)
create NONCLUSTERED  INDEX Distributors on Distributors(name);

drop INDEX IX_Books_Category_ID on Books;


SELECT Category_name, Title, Author_id, Publication_date, Description, Publisher_ID, Distributor_ID
FROM Books
INNER JOIN Categories ON Books.Category_ID = Categories.Category_ID
where Categories.Category_ID>1
;



-----------------VIEWS------------------------------------------
CREATE VIEW Books_by_category AS
SELECT Category_name, Title, Author_id, Publication_date, Description, Publisher_ID, Distributor_ID
FROM Books
INNER JOIN Categories ON Books.Category_ID = Categories.Category_ID;

select * from Books_by_category;

CREATE VIEW Books_by_publisher AS
SELECT Name, Title, Author_id, Publication_date, Description, Category_ID, Distributor_ID
FROM Books
INNER JOIN Publishers ON Books.Publisher_ID = Publishers.Publisher_ID;

select * from Books_by_publisher;

create view BooksWithAuthorsAndCategories as
select Title, Name, Category_name
from Books
inner join Authors on Books.Author_id = Authors.Author_ID
inner join Categories on Books.Category_ID = Categories.Category_ID;

select * from BooksWithAuthorsAndCategories;




-----------------PROCEDURES------------------------------------
CREATE PROCEDURE spGetBooksByCategory
@Category_name varchar(30)
AS
BEGIN
SELECT Title, Author_id, Publication_date, Description, Publisher_ID, Distributor_ID
FROM Books
INNER JOIN Categories ON Books.Category_ID = Categories.Category_ID
WHERE Category_name = @Category_name
END

EXEC spGetBooksByCategory 'Science';

CREATE PROCEDURE spUpdateInventory
@ISBN varchar(20),
@Copies_in_stock int
AS
BEGIN
UPDATE Inventory
SET Copies_in_stock = @Copies_in_stock
WHERE ISBN = @ISBN
END

EXEC spUpdateInventory '0-451-52812-2', 10;

create or alter procedure spUpdateOrders
@ISBN varchar(20),
@Copies_ordered int
as
begin
update Orders
set Copies_ordered = @Copies_ordered
where ISBN = @ISBN
end

EXEC spUpdateOrders '0-451-52812-2', 10;



------------------FUNCTIONS-------------------------------------
CREATE FUNCTION fnGetBooksByCategory
(@Category_name varchar(30))
RETURNS TABLE
AS
RETURN
(
SELECT Title, Author_id, Publication_date, Description, Publisher_ID, Distributor_ID
FROM Books
INNER JOIN Categories ON Books.Category_ID = Categories.Category_ID
WHERE Category_name = @Category_name
)

SELECT * FROM fnGetBooksByCategory('Science');


create or alter function fnGetAverageRevenue()
returns decimal(10,2)
as
begin
declare @averageRevenue decimal(10,2)
select @averageRevenue =  avg(Revenue) from Sales
return @averageRevenue
end;

select dbo.fnGetAverageRevenue() as AverageRevenue;


create or alter function fnGetAverageRevenueByCategory(@categoryName varchar(30))
returns decimal(10,2)
as
begin
declare @averageRevenue decimal(10,2)
select @averageRevenue =  avg(Revenue) from Sales
inner join Books on Sales.ISBN = Books.ISBN
inner join Categories on Books.Category_ID = Categories.Category_ID
where Category_name = @categoryName
return @averageRevenue
end;

select dbo.fnGetAverageRevenueByCategory('Science') as AverageRevenue;
    




------------------TRIGGERS--------------------------------------
CREATE TRIGGER Update_Inventory_Trigger
ON Orders
AFTER INSERT
AS
BEGIN
UPDATE Inventory
SET Copies_in_stock = Copies_in_stock - (SELECT Copies_ordered FROM inserted)
WHERE ISBN = (SELECT ISBN FROM inserted)
END;

insert into Orders (ISBN, Order_date, Copies_ordered, Customer_ID)
values ('0-7432-5222-0', '2022-01-01',5, 1);


create or alter trigger Prevent_Negative_Inventory
on Inventory
after update
as
begin
if (select Copies_in_stock from inserted) < 0
begin
raiserror('Inventory cannot be negative', 16, 1)
    rollback transaction ;
end
end


create trigger EXample_trigger
on Books
after insert
as
begin
PRINT 'New book added'
end





insert into Orders (ISBN, Order_date, Copies_ordered, Customer_ID)
values ('0-385-36041-0', '2019-01-01', 10, 1);


------------------FILLING TABLES--------------------------------
INSERT INTO Publishers ( Name, Address, Contact_info)
VALUES ( 'Penguin Random House', '1745 Broadway, New York, NY 10019', '(212) 572-2111'),
       ( 'Simon & Schuster', '1230 Avenue of the Americas, New York, NY 10020', '(212) 698-7000'),
       ( 'Hachette Book Group', '1290 Avenue of the Americas, New York, NY 10104', '(212) 364-1100');

-- Populate Distributors table
INSERT INTO Distributors (Name, Address, Contact_info)
VALUES ('Amazon', '410 Terry Ave N, Seattle, WA 98109', '(206) 266-1000'),
       ('Barnes & Noble', '122 Fifth Ave, New York, NY 10011', '(212) 633-3300'),
       ('Books-A-Million', '4200 Lafayette Center Dr, Chantilly, VA 20151', '(703) 378-1400');

-- Populate Categories table
INSERT INTO Categories (Category_name)
VALUES ('Science'),
       ('Technology'),
       ('Engineering'),
       ('Mathematics');

---- Populate Authors table
INSERT INTO Authors (Name, Date_of_birth, Bio, Nationality)
VALUES ('F. Scott Fitzgerald', '1896-09-24', 'Francis Scott Key Fitzgerald was an American novelist and short story writer, whose works illustrate the Jazz Age.', 'American'),
       ('J.D. Salinger', '1919-01-01', 'Jerome David Salinger was an American writer who is known for his widely-read novel The Catcher in the Rye as well as his reclusive nature.', 'American'),
       ('J.R.R. Tolkien', '1892-01-03', 'John Ronald Reuel Tolkien was an English writer, poet, philologist, and university professor who is best known as the author of the classic high fantasy works The Hobbit, The Lord of the Rings, and The Silmarillion.', 'English'),
       ('Stephen King', '1947-09-21', 'Stephen Edwin King is an American author of horror, supernatural fiction, suspense, science fiction, and fantasy.', 'American'),
       ('J.K. Rowling', '1965-07-31', 'Joanne Rowling, better known by her pen name J. K. Rowling, is a British author, philanthropist, film producer, television producer, and screenwriter.', 'British'),
       ('George R.R. Martin', '1948-09-20', 'George Raymond Richard Martin is an American novelist and short story writer in the fantasy, horror, and science fiction genres, screenwriter, and television producer.', 'American'),
       ('Dan Brown', '1964-06-22', 'Daniel Gerhard Brown is an American author best known for his thriller novels, including The Da Vinci Code, Angels & Demons, Deception Point, and Inferno.', 'American'),
       ('J.D. Vance', '1983-03-16', 'John David Vance is an American author and entrepreneur. He is best known for his memoir Hillbilly Elegy: A Memoir of a Family and Culture in Crisis, which was published in 2016.', 'American'),
       ('John Grisham', '1955-02-08', 'John Ray Grisham, Jr. is an American novelist, attorney, politician, and activist, best known for his popular legal thrillers.', 'American');




-- Populate Books table
INSERT INTO Books (ISBN, Title, Author_id, Publication_date, Description, Category_ID, Publisher_ID, Distributor_ID)
VALUES ('0-451-52812-2', 'The Great Gatsby', 1, '1925-04-10', 'The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional town of West and East Egg on prosperous Long Island in the summer of 1922.', 1, 1, 1),
       ('0-7432-5222-0', 'The Catcher in the Rye', 2, '1951-07-16', 'The Catcher in the Rye is a 1951 novel by J. D. Salinger. A controversial novel originally published for adults, it has since become popular with adolescent readers for its themes of teenage angst and alienation.', 1, 2, 2),
       ('0-385-36041-0', 'The Hobbit', 3, '1937-09-21', 'The Hobbit, or There and Back Again is a children''s fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.', 2, 3, 3),
       ('0-345-81004-2', 'The Shining', 4, '1977-01-28', 'The Shining is a 1977 horror novel by American author Stephen King. It is King''s third published novel and first hardback bestseller: the success of the book firmly established King as a preeminent author in the horror genre.', 2, 1, 1),
       ('0-679-80535-4', 'Harry Potter and the Sorcerer''s Stone', 5, '1997-06-26', 'Harry Potter and the Philosopher''s Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling''s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.', 2, 2, 2);
-- Populate Inventory table
INSERT INTO Inventory (ISBN, Copies_in_stock, Location)
VALUES ('0-451-52812-2', 10, 'New York'),
       ('0-7432-5222-0', 20, 'New York'),
       ('0-385-36041-0', 30, 'New York'),
       ('0-345-81004-2', 40, 'New York'),
       ('0-679-80535-4', 50, 'New York');

-- Populate Customers table
INSERT INTO Customers (Name, Address, Contact_info)
VALUES ('John Smith', '123 Main St, New York, NY 10001', '(212) 555-1234'),
       ('Jane Doe', '456 Broadway, New York, NY 10001', '(212) 555-5678'),
       ('John Doe', '789 5th Ave, New York, NY 10001', '(212) 555-9012');
-- Populate Orders table
INSERT INTO Orders (Customer_ID, ISBN, Copies_ordered, Order_date)
VALUES
       (1, '0-7432-5222-0', 1, '2020-01-01'),
       (2, '0-385-36041-0', 1, '2020-01-01'),
       (2, '0-345-81004-2', 1, '2020-01-01'),
       (3, '0-679-80535-4', 1, '2020-01-01');

-- Populate sales table
INSERT INTO Sales (ISBN, Sales_date, Copies_sold, Revenue)
VALUES ('0-451-52812-2', '2020-01-01', 1, 10),
       ('0-7432-5222-0', '2020-01-01', 1, 20),
       ('0-385-36041-0', '2020-01-01', 1, 30),
       ('0-345-81004-2', '2020-01-01', 1, 40),
       ('0-679-80535-4', '2020-01-01', 1, 50);


begin
    declare @result decimal(10, 2)
    exec
        @result = dbo.fnGetAverageRevenue
    select @result as result
end