import  express from 'express';
const app = express()
import  https from 'https'
import fs from "fs";

const port = 3000

let options =
{
    key: fs.readFileSync('./security/RS-LAB26-ZDA.key'),
    passphrase: 'SECRET',
    cert: fs.readFileSync('./security/LAB.crt')
};

app.get('/', (req, res) =>
{
    res.send("hello from https")
})

https.createServer(options, app).listen(port, () =>
{
    console.log(`https://localhost:${port}/`);
});