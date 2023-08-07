import express from 'express';
import bodyParser from "body-parser";
import { JSONRPCServer } from 'json-rpc-2.0';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = new JSONRPCServer();
server.addMethod('sum', (params) => {
    if (params.length === 0) {
        throw new Error('At least one parameter is required for sum');
    }
    return params.reduce((acc, curr) => acc + curr, 0);
});
server.addMethod('mul', (params) => {
    if (params.length === 0) {
        throw new Error('At least one parameter is required for mul');
    }
    return params.reduce((acc, curr) => acc * curr, 1);
});
server.addMethod('div', (params) => {
    const { x, y } = params;
    if ((typeof x === 'undefined' || typeof y === 'undefined')) {
        throw new Error('Parameters x and y are required for div');
    }
    if (y === 0) {
        throw new Error('Division by zero');
    }
    return x / y;
});
server.addMethod('proc', (params) => {
    const { x, y } = params;
    if ((typeof x === 'undefined' || typeof y === 'undefined')) {
        throw new Error('Parameters x and y are required for div');
    }
    if (y === 0) {
        throw new Error('Division by zero');
    }
    return (x / y) * 100;
});
app.post("/json-rpc", (req, res) => {
    const jsonRPCRequest = req.body;
    server.receive(jsonRPCRequest).then(jsonRPCResponse => {
        if (jsonRPCResponse) {
            res.json(jsonRPCResponse);
        }
        else {
            res.sendStatus(204);
        }
    });
});
app.use((req, res, next) => {
    console.log(req.method, decodeURI(req.url));
    next();
});
app.listen(3000, () => {
    console.log("Server running");
});
//# sourceMappingURL=29.js.map