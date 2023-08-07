/*Вычисление итогов выпуска продукции определенного направления за определенный период:
•	объем выпуска;
•	сравнение с общим объемом выпуска (в %);
•	сравнение с пиковыми значениями объема выпуска (в %).*/

DECLARE @LastMonth date = DATEADD(month, -1, GETDATE());
WITH PublisherSales AS (
  SELECT Publisher_ID, SUM(Copies_sold) AS TotalSales
  FROM Sales
  join Books B on B.ISBN = Sales.ISBN
  WHERE Sales_date >= @LastMonth AND Publisher_ID IS NOT NULL
  GROUP BY Publisher_ID
),
TotalSales AS (
  SELECT SUM(Copies_sold) AS TotalSales
  FROM Sales
  WHERE Sales_date >= @LastMonth
)
SELECT
  p.Name AS Publisher,
  ISNULL(ps.TotalSales, 0) AS SalesLastMonth,
  ISNULL(ps.TotalSales, 0) * 100.0 / t.TotalSales AS SalesLastMonthPercentage,
  MAX(ISNULL(ps.TotalSales, 0)) OVER () * 100.0 / t.TotalSales AS MaxSalesPercentage
FROM Publishers p
LEFT JOIN PublisherSales ps ON p.Publisher_ID = ps.Publisher_ID
CROSS JOIN TotalSales t
ORDER BY SalesLastMonth DESC;

/*3.	Продемонстрируйте применение функции ранжирования ROW_NUMBER() для разбиения результатов запроса на страницы (по 20 строк на каждую страницу).
4.	Продемонстрируйте применение функции ранжирования ROW_NUMBER() для удаления дубликатов.*/

DECLARE @PageSize INT = 20;
DECLARE @PageNumber INT = 1;

SELECT *
FROM (
  SELECT ROW_NUMBER() OVER (ORDER BY Sales_date DESC) AS RowNum, *
  FROM Sales
) AS RowNumberedSales
WHERE RowNum > (@PageNumber - 1) * @PageSize AND RowNum <= @PageNumber * @PageSize;


WITH Duplicates AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY ISBN ORDER BY Sales_date DESC) AS RowNum
  FROM Sales
)
DELETE FROM Duplicates
WHERE RowNum > 1;

select Publication_date from Books
--Вернуть для каждого автора количество изданных книг за последние 6 месяцев помесячно
SELECT Authors.Name AS AuthorName,
       DATENAME(month, DATEADD(month, DATEDIFF(month, 0, Books.Publication_date) - 6, 0)) AS Month,
       COUNT(*) AS BooksPublished
FROM Authors
INNER JOIN Books ON Authors.Author_ID = Books.Author_ID
WHERE Books.Publication_date >= DATEADD(month, DATEDIFF(month, 0, GETDATE()) - 6, 0)
GROUP BY Authors.Name, DATENAME(month, DATEADD(month, DATEDIFF(month, 0, Books.Publication_date) - 6, 0))
ORDER BY AuthorName, Month;


--6.	Найдите при помощи функций ранжирования статистическое значение во множестве наблюдений, которое встречается наиболее часто:

SELECT Revenue, COUNT(*) AS Frequency, RANK() OVER (ORDER BY COUNT(*) DESC) AS Rank
FROM Sales
GROUP BY Revenue
ORDER BY Frequency DESC

-- Какой жанр пользовался наибольшей популярностью для определенного автора? Вернуть для всех авторов.

SELECT a.Name AS Author, c.Category_Name AS Genre, COUNT(*) AS BooksSold
FROM Authors a
JOIN Books b ON a.Author_ID = b.Author_id
JOIN Categories c ON b.Category_ID = c.Category_ID
JOIN Sales s ON b.ISBN = s.ISBN
GROUP BY a.Name, c.Category_Name
HAVING COUNT(*) = (
    SELECT MAX(BookCount)
    FROM (
        SELECT COUNT(*) AS BookCount
        FROM Authors aa
        JOIN Books bb ON aa.Author_ID = bb.Author_id
        JOIN Categories cc ON bb.Category_ID = cc.Category_ID
        JOIN Sales ss ON bb.ISBN = ss.ISBN
        WHERE aa.Name = a.Name
        GROUP BY cc.Category_Name
    ) AS BookCounts
)
ORDER BY a.Name







