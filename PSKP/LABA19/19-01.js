import http from 'http'
import GetHandler from "./handlers/GetHandler.js";
import PostHandler from "./handlers/PostHandler.js";
import PutHandler from "./handlers/PutHandler.js";
import DeleteHandler from "./handlers/DeleteHandler.js";
import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()


const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            GetHandler(req, res, prisma);
            break;
        case 'POST':
            PostHandler(req, res, prisma);
            break;
        case 'PUT':
            PutHandler(req, res, prisma);
            break;
        case 'DELETE':
            DeleteHandler(req, res, prisma);
            break;
        default:
            res.writeHead(405, {'Content-Type': 'text/plain'});
            res.end('Method not allowed');

    }
}).listen(5000);




