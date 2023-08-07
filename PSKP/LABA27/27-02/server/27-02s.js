import express from 'express';
import fs from 'fs';
import crypto from 'crypto';
const app = express();
const studentData = fs.readFileSync('../data/DSserver.txt', 'utf8');
const sign = crypto.createSign('SHA256');
sign.write(studentData);
sign.end();
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "pkcs1", format: "pem" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
});
const signature = sign.sign(privateKey, 'hex');
app.get('/student', (req, res) => {
    res.json({ studentData, signature, publicKey });
});
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
//# sourceMappingURL=27-02s.js.map