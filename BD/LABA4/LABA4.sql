create database map;

INSERT INTO Publishers (Name, Address, Contact_info)
VALUES
  ('Penguin Random House', geography::STPointFromText('POINT(-73.9814 40.7648)', 4326), 'info@penguinrandomhouse.com'),
  ('HarperCollins', geography::STPointFromText('POINT(-74.0060 40.7395)', 4326), 'info@harpercollins.com'),
  ('Simon & Schuster', geography::STPointFromText('POINT(-73.9808 40.7580)', 4326), 'info@simonandschuster.com'),
  ('Hachette Book Group', geography::STPointFromText('POINT(-73.9908 40.7561)', 4326), 'info@hachettebookgroup.com'),
  ('Macmillan Publishers', geography::STPointFromText('POINT(-73.9787 40.7549)', 4326), 'info@macmillan.com');

CREATE SPATIAL INDEX MySpatialIndex ON Publishers(Address) USING GEOGRAPHY_GRID;



BEGIN
    DECLARE @A geography
    DECLARE @B geography
    set @A  =( select Address from Publishers where Publisher_ID = 1)
    set @B = ( select Address from Publishers where Publisher_ID = 2)
    SELECT @A.STIntersection(@B)
    SELECT @A.STUnion(@B)
    SELECT @A.STDifference(@B)
    SELECT @A.STDistance(@B)
end

BEGIN
    DECLARE @B geography = geography::STPointFromText('POINT(-73.9852 40.7575)', 4326)
    DECLARE @A geography = geography::STPointFromText('POINT(-55.120 30.1225)', 4326)

    DECLARE @refined geography = @A.STUnion(@B)

    SELECT @refined
end


use map;

CREATE TABLE Categories_Set (
    CategoryID INT PRIMARY KEY,
    CategoryName NVARCHAR(50) NOT NULL,
    LeftValue INT NOT NULL,
    RightValue INT NOT NULL
);
select * from Categories_Set;

INSERT INTO Categories_Set (CategoryID, CategoryName, LeftValue, RightValue)
VALUES (1, 'Books', 1, 14),
       (2, 'Fiction', 2, 9),
       (3, 'Non-fiction', 10, 13),
       (4, 'Literature', 3, 6),
       (5, 'Science fiction', 4, 5),
       (6, 'Romance', 7, 8);

CREATE  or alter PROCEDURE GetCategoryDescendants
    @CategoryID INT
AS
BEGIN
    SELECT CategoryName
    FROM Categories_Set
    WHERE LeftValue >= (SELECT LeftValue FROM Categories_Set WHERE CategoryID = @CategoryID)
      AND RightValue <= (SELECT RightValue FROM Categories_Set WHERE CategoryID = @CategoryID)
      AND CategoryID != @CategoryID;
END;

    EXEC GetCategoryDescendants 2;


