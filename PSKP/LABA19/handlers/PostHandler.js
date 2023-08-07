import MapModel from "../Helpers/EndpointsModelMap.js";
import WriteJson from "../Helpers/WriteJson.js";

export default function PostHandler(req, res, models) {
    let path = decodeURI(req.url);
    console.log(req.method + ' ' + path);
    const endpoints = MapModel(models);

    if (path === "/api/faculties") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            let data = JSON.parse(body);
            let {FACULTY, FACULTY_NAME, PULPITS} = data;
            try {
                let instance = await models.fACULTY.create(
                    {
                        data: {
                            FACULTY: FACULTY,
                            FACULTY_NAME: FACULTY_NAME,
                            PULPIT_PULPIT_FACULTYToFACULTY: {
                                create: PULPITS
                            }

                        },
                        include: {
                            PULPIT_PULPIT_FACULTYToFACULTY: true
                        }
                    }
                );
                WriteJson(req, res, instance);
            } catch (e) {
                res.writeHead(400, {'Content-Type': 'text/json'});
                res.end(JSON.stringify({error: e.message}));
            }

        });

        return;
    }

    if (path === "/api/pulpits") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            let data = JSON.parse(body);
            let {PULPIT, PULPIT_NAME, FACULTY, FACULTY_NAME} = data;
            try {
                let instance = await models.pULPIT.create(
                    {
                        data: {
                            PULPIT,
                            PULPIT_NAME,
                            FACULTY_PULPIT_FACULTYToFACULTY: {
                                connectOrCreate: {
                                    where: {FACULTY},
                                    create: {
                                        FACULTY,
                                        FACULTY_NAME

                                    }

                                }
                            }

                        },
                        include: {
                            FACULTY_PULPIT_FACULTYToFACULTY: true
                        }
                    }
                );
                WriteJson(req, res, instance);
            } catch (e) {
                res.writeHead(400, {'Content-Type': 'text/json'});
                res.end(JSON.stringify({error: e.message}));
            }


        });
        return;
    }


    if (path in endpoints) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            let data = JSON.parse(body);
            let model = endpoints[path];
            try {
                let instance = await model.create(
                    {data: data}
                );
                WriteJson(req, res, instance);
            } catch (e) {
                res.writeHead(400, {'Content-Type': 'text/json'});
                res.end(JSON.stringify({error: e.message}));
            }
        });
    }
}