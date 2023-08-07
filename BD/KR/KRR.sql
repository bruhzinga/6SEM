--»спользую оконные функции найти второго по успешности сотрудника каждого отдела

SELECT REP_OFFICE, NAME, SALES_RANK
FROM (
  SELECT REP_OFFICE, NAME, SALES,
         DENSE_RANK() OVER (PARTITION BY REP_OFFICE ORDER BY SALES DESC) AS SALES_RANK
  FROM SALESREPS
) AS SR
WHERE SALES_RANK = 2;

--»спользую оконные функции  вы€снить, как отличаютс€ продажи самого успешного сотрудника каждого отдела от продаж других сотрудников этого же отдела (в %)

SELECT NAME, REP_OFFICE, SALES, MAX_SALES, 100*(SALES-MAX_SALES)/MAX_SALES AS PERCENT_DIFF
FROM (
  SELECT NAME, SALES, REP_OFFICE,
         MAX(SALES) OVER (PARTITION BY REP_OFFICE) AS MAX_SALES
  FROM SALESREPS
) AS SR

--»спользую оконные функции  вы€снить, на сколько % отличаютс€ продажи товаров каждого сотрудника в отделе от предыдущего, если упор€дочить их по возрастанию.
SELECT
    NAME,
REP_OFFICE,
    SALES,
    LAG(SALES) OVER (PARTITION BY REP_OFFICE ORDER BY SALES) AS PREV_SALES,
    ((SALES - LAG(SALES) OVER (PARTITION BY REP_OFFICE ORDER BY SALES)) / LAG(SALES) OVER (PARTITION BY REP_OFFICE ORDER BY SALES)) * 100 AS SALES_DIFF_PERCENT
FROM
SALESREPS;





SELECT
  s.NAME,
  SUM(CASE
        WHEN YEAR(o.ORDER_DATE) = 2007 AND MONTH(o.ORDER_DATE) >= 10
          THEN o.AMOUNT
        ELSE 0
      END) AS sales_2007,
  SUM(CASE
        WHEN YEAR(o.ORDER_DATE) = 2008 AND MONTH(o.ORDER_DATE) <=3
          THEN o.AMOUNT
        ELSE 0
      END) AS sales_2008,
  ABS(SUM(CASE
            WHEN YEAR(o.ORDER_DATE) = 2007 AND MONTH(o.ORDER_DATE) >= 10
              THEN o.AMOUNT
            ELSE 0
          END) -
      SUM(CASE
            WHEN YEAR(o.ORDER_DATE) = 2008 AND MONTH(o.ORDER_DATE) <=3
              THEN o.AMOUNT
            ELSE 0
          END)) AS sales_diff
FROM
  SALESREPS s
  INNER JOIN ORDERS o ON s.EMPL_NUM = o.REP
GROUP BY
  s.NAME
ORDER BY
  sales_diff DESC;






