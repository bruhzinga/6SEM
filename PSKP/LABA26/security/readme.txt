private key Certification Authority
openssl genrsa -des3 -out CA-LAB25-YMA.key 2048

Certification Authority
openssl req -x509 -new -key CA-LAB25-YMA.key -days 700 -sha256 -out CA-LAB25-YMA.crt

-------------------------------------------------------------

private key for resource
openssl genrsa -des3 -out RS-LAB25-YMA.key 2048

openssl rsa -in RS-LAB25-YMA.key -out RS-LAB25-YMA-RSA.key

certificate for request
openssl req -new -key RS-LAB25-YMA-RSA.key -out RS-YMA.csr -sha256 -config Resource_YMA.cfg

certificate for resource
openssl x509 -req -in RS-YMA.csr -CA CA-LAB25-YMA.crt -CAkey CA-LAB25-YMA.key -CAcreateserial -out RS-YMA.crt -days 365 -sha256 -extensions v3_req -extfile Resource_YMA.cfg