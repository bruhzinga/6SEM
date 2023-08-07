import {ServerResponse, IncomingMessage} from 'http';

export default function (req, res, object) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(object));
}