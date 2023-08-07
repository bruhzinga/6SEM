CREATE TABLE Categories (
    Category_ID INT PRIMARY KEY identity (1,1),
    Category_Name NVARCHAR(50) NOT NULL,
    ParentCategoryID INT NULL,
    CONSTRAINT FK_Categories_ParentCategoryID
        FOREIGN KEY (ParentCategoryID) REFERENCES Categories(Category_ID)
);

INSERT INTO Categories ( Category_Name, ParentCategoryID)
VALUES ( 'Books', NULL),
       ( 'Fiction', 1),
       ( 'Non-fiction', 1),
       ( 'Literature', 2),
       ( 'Science fiction', 4),
       ( 'Romance', 4),
       ( 'Biographies', 3),
       ( 'History', 3),
       ( 'Art history', 8),
       ( 'Military history', 8),
       ( 'World War II', 10);


CREATE PROCEDURE GetSubordinateCategories
    @CategoryID INT
AS
BEGIN
    WITH CategoryHierarchy (CategoryID, CategoryName, ParentCategoryID, Level) AS (
        SELECT Category_ID, Category_Name, ParentCategoryID, 0 AS Level
        FROM Categories
        WHERE Category_ID = @CategoryID
        UNION ALL
        SELECT c.Category_ID, c.Category_Name, c.ParentCategoryID, ch.Level + 1
        FROM Categories c
        JOIN CategoryHierarchy ch ON c.ParentCategoryID = ch.CategoryID
    )
    SELECT CategoryID, CategoryName, ParentCategoryID, Level
    FROM CategoryHierarchy
    ORDER BY Level, CategoryName;
END;


EXEC GetSubordinateCategories 3;

    CREATE PROCEDURE AddSubordinateCategory
    @CategoryName NVARCHAR(50),
    @ParentCategoryID INT
AS
BEGIN
    INSERT INTO Categories (Category_Name, ParentCategoryID)
    VALUES (@CategoryName, @ParentCategoryID);
END;

EXEC AddSubordinateCategory 'Mystery', 2;

CREATE PROCEDURE MoveSubordinateBranch
    @CategoryID INT,
    @NewParentCategoryID INT
AS
BEGIN
    UPDATE Categories
    SET ParentCategoryID = @NewParentCategoryID
    WHERE Category_ID IN (
        SELECT Category_ID
        FROM Categories
        WHERE Category_ID = @CategoryID OR ParentCategoryID = @CategoryID
    );
END;

EXEC MoveSubordinateBranch 4, 3;




