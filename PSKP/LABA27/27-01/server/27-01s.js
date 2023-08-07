import express from 'express';
import bodyParser from "body-parser";
import * as fs from "fs";
import crypto from "crypto";
import { ServerDH } from "./server-dh.js";
const app = express();
app.use(bodyParser.json()); //utilizes the body-parser package
app.use(bodyParser.urlencoded({ extended: true }));
let serverDH;
app.get('/', (req, res) => {
    serverDH = new ServerDH(1024, 3);
    res.send(serverDH.getContext());
});
app.post('/resource', (req, res) => {
    const clientContext = req.body.clientContext;
    if (!clientContext) {
        res.status(409).send('Client context not found');
        return;
    }
    const secret = serverDH.getSecret(clientContext);
    const cipher = crypto.createCipher('aes256', secret.toString());
    const file = fs.readFileSync('../data/DHserver.txt', 'utf-8');
    const encrypted = cipher.update(file, 'utf-8', 'hex') + cipher.final('hex');
    res.send(encrypted);
});
app.use((req, res, next) => {
    console.log(req.method, decodeURI(req.url));
    next();
});
app.listen(3000, () => {
    console.log("Server running");
});
//# sourceMappingURL=27-01s.js.map