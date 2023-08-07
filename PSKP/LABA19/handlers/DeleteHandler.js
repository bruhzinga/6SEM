import MapModel from "../Helpers/EndpointsModelMap.js";
import WriteJson from "../Helpers/WriteJson.js";

import {PrimaryKeysMap} from "./PutHandler.js";


export default async function DeleteHandler(req, res, models) {
    let path = decodeURI(req.url);
    console.log(req.method + ' ' + path);
    let slicedPath = path.slice(0, path.lastIndexOf("/"));


    const endpoints = MapModel(models);

    if (slicedPath in endpoints) {
        const model = endpoints[slicedPath];
        let pk = PrimaryKeysMap[slicedPath];
        const id = path.split('/')[3];
        try {

            const instance = await model.delete(
                {
                    where: {
                        [pk]: id
                    }
                }
            )
            WriteJson(req, res, instance);
        } catch (e) {
            res.writeHead(400, {'Content-Type': 'text/json'});
            res.end(JSON.stringify({error: e.message}));
        }
        return;

    }

    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');

}