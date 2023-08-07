import WriteJson from "../Helpers/WriteJson.js";
import MapModel from "../Helpers/EndpointsModelMap.js";

export const PrimaryKeysMap =
    {
        "/api/faculties": "FACULTY",
        "/api/pulpits": "PULPIT",
        "/api/subjects": "SUBJECT",
        "/api/teachers": "TEACHER",
        "/api/auditoriumstypes": "AUDITORIUM_TYPE",
        "/api/auditoriums": "AUDITORIUM",
    }


export default function PutHandler(req, res, models) {
    let path = decodeURI(req.url);
    console.log(req.method + ' ' + path);
    const endpoints = MapModel(models);
    if (path in endpoints) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const data = JSON.parse(body);
            let model = endpoints[path];
            try {
                let pk = PrimaryKeysMap[path];


                let instance = await model.update(
                    {
                        data: data,
                        where: {
                            [pk]: data[pk]
                        }
                    },
                );
                WriteJson(req, res, instance);
            } catch (e) {
                res.writeHead(400, {'Content-Type': 'text/json'});
                res.end(JSON.stringify({error: e.message}));
            }
        });
        return;
    }

    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
}