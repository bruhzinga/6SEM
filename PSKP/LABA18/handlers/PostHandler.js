import WriteJson from "../../LABA19/Helpers/WriteJson.js";
import MapModel from "../../LABA19/Helpers/EndpointsModelMap.js";


export default function PostHandler(req, res, models) {
    let path = decodeURI(req.url);
    console.log(req.method + ' ' + path);
    const endpoints = MapModel(models);

    if (path in endpoints) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            let data = JSON.parse(body);
            let model = endpoints[path];
            try {
                let instance = await model.create(data);
                WriteJson(req, res, instance);
            } catch (e) {
                res.writeHead(400, {'Content-Type': 'text/json'});
                res.end(JSON.stringify(e));
            }
        });
    }
}