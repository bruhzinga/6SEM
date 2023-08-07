import WriteJson from "../../LABA19/Helpers/WriteJson.js";
import MapModel from "../../LABA19/Helpers/EndpointsModelMap.js";


export default async function DeleteHandler(req, res, models) {
    let path = decodeURI(req.url);
    console.log(req.method + ' ' + path);
    let slicedPath = path.slice(0, path.lastIndexOf("/"));


    const endpoints = MapModel(models);

    if (slicedPath in endpoints) {
        const model = endpoints[slicedPath];
        const pk = model.primaryKeyAttribute;
        const id = path.split('/')[3];
        try {
            const instance = await model.findByPk(id);
            await instance.destroy();
            WriteJson(req, res, instance);
        } catch (e) {
            res.writeHead(400, {'Content-Type': 'text/json'});
            res.end(JSON.stringify({error: "Not found"}));
        }
        return;

    }

    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');

}