
use PublishingHouse;
go

--2. Создать уч. записи, роли, юзеры, привилегии
	create Login dima with password='DIMA123suPer';		--логин
	create user Julia_User for login dima;		--юзер, привяз. к логину
	create user JustUser without login;				--юзер
	create role user_role;							--роль

	commit;
-- привилегии
	grant select, insert, update, delete on sales to user_role;
	revoke update on sales from user_role;
	EXEC sp_addrolemember @rolename = 'user_role', @membername = 'dima';


--3. Продем. заимствование прав для процедуры
	create login john with password = 'john123Super';
	create login jane with password = 'jane123Super';
	create user john for login John;
	create user jane for login Jane;

	exec sp_addrolemember 'db_datareader', 'John';
	exec sp_addrolemember 'db_ddladmin', 'John';
	deny select on sales to Jane;
	go 
	drop procedure Us_GetOrders;

	create procedure Us_GetOrders 
		with execute as 'John'
		as select * from sales;

	alter authorization on Us_GetOrders to John;
	grant execute on Us_GetOrders to Jane;
	
	--
	setuser 'Jane';
	exec Us_GetOrders;
	select * from sales;
	setuser;

---- С Е Р В Е Р Н Ы Й     А У Д И Т ----

--4. Создать серверный аудит
	use master;
	go

	create server audit Audit 
	to file(
		filepath = '/opt/mssql/bin',
		maxsize = 10 mb,
		max_rollover_files = 0,
		reserve_disk_space = off
	) with ( queue_delay = 1000, on_failure = continue);

	create server audit PAudit to application_log;
	create server audit AAudit to security_log;

	--
	select * from sys.server_audits;


--5. Задать для серв. аудита спецификации	
	create server audit specification ServerAuditSpecification12
		for server audit Audit
		add (database_change_group)
		with (state=on)


--6. Запустить серверный аудит, показать журнал аудита
	alter server audit Audit with (state=on);

	create database primer;
	drop database primer;
	go

	select statement from fn_get_audit_file('/opt/mssql/bin/Audit_F6BDC1F9-6CD5-457B-994B-55F2C24BB51A_0_133276932074440000.sqlaudit', null, null);	

---- А У Д И Т    Б А З Ы    Д А Н Н Ы Х ----

--7. Создать объекты аудита БД + спец + запуск + журнал
use PublishingHouse;
go
	create database audit specification DatabaseAuditSpecification1234
		for server audit [Audit-20230504-201102]
		add (insert on PublishingHouse.dbo.Sales by dbo)
		with (state=on);

	select * from PublishingHouse.dbo.Sales;
	INSERT INTO Sales (ISBN, Sales_date, Copies_sold, Revenue)
VALUES ('111-111-111', '2020-01-01', 1, 10);
go

	select statement from fn_get_audit_file('/opt/mssql/bin/Audit_F306B781-C7B1-47F5-9FB5-76BDA0E75B2C_0_133276933764520000.sqlaudit', null, null);	


--10. Остановить адуит БД и сервера
	alter server audit CAudit with (state=off);
	alter server audit PAudit with (state=off);
	alter server audit AAudit with (state=off);


---- Ш И Ф Р О В А Н И Е ----

--11. Создать ассим. ключ шифрования
	use PublishingHouse;
	go
	create asymmetric key SampleAKey
		with algorithm = rsa_2048
		encryption by password = 'Pas45!!~~';

--12. Зашифр и расш- данные при пом ключа
	declare @plaintext nvarchar(21);
	declare @ciphertext nvarchar (256);

	set @plaintext = 'this is a sample text';
	print @plaintext;

	set @ciphertext = EncryptByAsymKey(AsymKey_ID('SampleAKey'), @plaintext);
	print @ciphertext;

	set @plaintext = DecryptByAsymKey(AsymKey_ID('SampleAKey'), @ciphertext, N'Pas45!!~~');
	print @plaintext;


--13. Создать сертификат
	create certificate SampleCert
		encryption by password = N'pa$$W0RD'
		with subject = N'Sample Certificate',
		expiry_date = N'01.01.2024'


--14. Зашифр и расшиф данные при пом. сертификата.
	declare @plain_text nvarchar(58);
	set @plain_text = 'this is text 123';
	print @plain_text;

	declare @cipher_text nvarchar(256);
	set @cipher_text = EncryptByCert(Cert_ID('SampleCert'), @plain_text);
	print @cipher_text;

	set @plain_text = CAST(DecryptByCert(Cert_ID('SampleCert'), @cipher_text, N'pa$$W0RD') as nvarchar(58));
	print @plain_text;
	

--15. Создать симм. ключ шифрования
	create symmetric key SKey
	with algorithm = AES_256
	encryption by password = N'PA$$W0RD';

	open symmetric key SKey
	decryption by password = N'PA$$W0RD';

	create symmetric key SData
	with algorithm = AES_256
	encryption by symmetric key SKey;

	open symmetric key SData
	decryption by symmetric key SKey;


--16. Зашифр и расшифр данные при пом. ключа
	declare @plain_tex nvarchar(512);
	set @plain_tex = 'ECRYPTION WITH SYMMETRIC KEY';
	print @plain_tex;

	declare @cipher_tex nvarchar(1024);
	set @cipher_tex = EncryptByKey(Key_GUID('SData'), @plain_tex);
	print @cipher_tex;

	set @plain_tex = CAST(DecryptByKey(@cipher_tex) as nvarchar(512));
	print @plain_tex;

	close symmetric key SData;
	close symmetric key SKey;

--17. Продем. прозрачное шифрование БД
	use master;
	create master key encryption by password = 'p@$$wOrd';
	
	create certificate LabCert
		with subject = 'certificate ', 
		expiry_date = '01.01.2024';

	
	use PublishingHouse;
	create database encryption key
	with algorithm = AES_256
	encryption by server certificate LabCert;
	go

	alter database PublishingHouse
	set encryption on;
	go

	--удалить шифрование из БД
	alter database PublishingHouse 
	set encryption off;
	go


--18. Продем. хеширование (MD2, MD4, MD5, SHA1, SHA2)
	use PublishingHouse
	go
	--
	select HashBytes('SHA1', 'DATAFORSHA1');
	select HashBytes('MD4', 'DATAFORMD4');


--19. Продем применение ЭЦП при помощи сертификата.

	--подписывает текст сертификатом и возвращает подпись
	select * from sys. certificates;
	select SIGNBYCERT(256, N'TEXTTOENCRYPT', N'pa$$W0RD') as ЭЦП;	--сертификат	
	--0 - изменены, 1 - не изменены
	select VERIFYSIGNEDBYCERT(256, N'TEXTTOENCRYPT', 0x0100070204000000FC88066A71CF339BB05C7175499CBA1C8F69B4529455EBAB6F4BA555F7351BA1EDAB938DCD355F2BA827E9344D95CE314A6CCE95F682B249E68652DB680F0E56BDB2A8232B26F408669DB658858FE8E6D68227C00F4800BDFA15EC7FC6F3CD302CC0882D0DC664E8CBE51D878828B8B08A5E256F93402FF15DBEF0AD7B3903FE87F2A2AD20C52778D8813B97280640B9F702B59388D8DA72E5FC56FCF903BFAEB6F41AFC9B0B5D78F76C86A6A12331C740E8D5BE919149BEED6A828BEF68E0ED44ABAED4E2421EAB4DF18F4666AD3E3408D67E9AB4C90A0ABF4B0C414BC7C5792A9B40922EC574B03026B01670CC9B043CD072BC0E76832E75ACAB367A01ABAA8BBA216FFD1F6571064A26331B4995A6B1193BA9FC5336E3C53656C630F8A094720C47CFCD9845BEC4F0CDD262DA83BC7F01500424E21B2950FA827CE9ABE3E7B8F2225893401B765FC6BCDEA882BB43241992AF9B6584AF83390DE322DC2C3361E0005B1AE2D0029712F501BC7C945135FCF1617AEE5ACE9812E7C9158B7018);
	
	select * from sys. asymmetric_keys;
	select SIGNBYASymKey(256, N'TEXTTOENCRYPT1234', N'Pas45!!~~')	--ас.ключ
	select VERIFYSIGNEDBYASYMKEY(256, N'TEXTTOENCRYPT1234', 0x010007020400000065DF30AD30B7B64476896FA7D5D67C0B35FF799CCBB035DB58C6CD107B1A77791DA2C21BC4C7DA62A881EE4A485AFB74FBA448185919112317A71E6C6091601152DFC60E649307BAB89997BD44A8AD28CDA4A3644E41461139B569FF472A02338EDA5153D849FA8058E90C62E3D6D3A270C6F7422172144B83C0612153A6A40885EF19CDA6C7A8B6FF6615209B979467DE01949C85213ECACAFCA0D488AB730DBBB4FC89245F08E61C3C68B6FD1D16EAB6AE1DB859944B2E01C3DE771150DD3D4029438E06680B670FFA496F47CB8B41C3D030C07CD3E05EFF02C4A3F1C271AE99752A0E2CC3E88F12567BFF8ABF07F45859E9967F940F138257BC6637491B33);


--20. Сделать резервную копию необходимых ключей и сертификатов.
	backup certificate SampleCert
	to file = N'/opt/mssql/bin/BackupSampleCert.cer'
		with private key(
			file = N'/opt/mssql/bin/BackupSampleCert.pvk',
			encryption by password = N'pa$$W0RD',
			decryption by password = N'pa$$W0RD');

	use master;
	BACKUP MASTER KEY TO FILE = '/opt/mssql/bin\BackupMasterKey.key' 
			ENCRYPTION BY PASSWORD = 'p@$$wOrd';

		