import http from 'http'
import GetHandler from "./handlers/GetHandler.js";
import PostHandler from "./handlers/PostHandler.js";
import PutHandler from "./handlers/PutHandler.js";
import DeleteHandler from "./handlers/DeleteHandler.js";
import initModels from "./models/init-models.js";
import sequelize from "./sequalize.js";

const models = initModels(sequelize);

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            GetHandler(req, res, models);
            break;
        case 'POST':
            PostHandler(req, res, models);
            break;
        case 'PUT':
            PutHandler(req, res, models);
            break;
        case 'DELETE':
            DeleteHandler(req, res, models);
            break;
        default:
            res.writeHead(405, {'Content-Type': 'text/plain'});
            res.end('Method not allowed');

    }
}).listen(3000);
