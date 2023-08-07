exec sp_configure 'clr enabled', 1
reconfigure

EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;

EXEC sp_configure 'clr strict security', 0;
RECONFIGURE;

alter database PublishingHouse set trustworthy  ON;




CREATE ASSEMBLY LABA3 FROM '\tmp\LABA3.dll'
 with PERMISSION_SET = UNSAFE

drop assembly LABA3



CREATE PROCEDURE dbo.UpdateNotification
@tableName NVARCHAR(128),
@recipients NVARCHAR(256),
@subject NVARCHAR(256),
@body NVARCHAR(MAX)
AS EXTERNAL NAME LABA3.[LABA3.StoreProcedure].SendEmailOnUpdate;

drop procedure dbo.UpdateNotification;




CREATE TYPE Address
EXTERNAL NAME LABA3.[LABA3.Address];

drop type  Address;

declare @addres as Address
set @addres ='TestStreet,New Test,TEXAS,1337'
print @addres.State





create trigger TableChangeJournalTrigger
on Orders
after insert,update,delete
as
begin
     exec dbo.UpdateNotification 'Orders','zvor2003@gmail.com','Change','Order table was changed'
end





