import fs from "fs";
import WriteJson from "../../LABA19/Helpers/WriteJson.js";
import MapModel from "../../LABA19/Helpers/EndpointsModelMap.js";
import Sequalize from "../sequalize.js";
import seq from "sequelize";


export default async function GetHandler(req, res, models) {
    let path = decodeURI(req.url);
    console.log(req.method + ' ' + path);
    const endpoints = MapModel(models);

    if (path === "/") {
        res.end(fs.readFileSync("LABA18/index.html"));
        return;
    }
    if (path in endpoints) {
        let model = endpoints[path];
        let instances = await model.findAll();
        WriteJson(req, res, instances);
        return;
    }
    if (RegExp('^/api/faculty/[^/]*/subjects/?$').test(path)) {
        let faculty = path.split('/')[3];
        let facultyAndSubjects = await models.FACULTY.findAll(
            {
                where: {FACULTY: `${faculty}`},
                include: [
                    {
                        model: models.PULPIT, as: "PULPITs", required: true, include: [
                            {
                                model: models.SUBJECT, as: "SUBJECTs", required: true
                            }
                        ]
                    }
                ],
            }
        )
        let subjects = facultyAndSubjects[0].PULPITs.map(pulpit => {
            return pulpit.SUBJECTs;
        });

        let facultyAndSubjectsFormatted =
            {
                FACULTY: facultyAndSubjects[0].FACULTY,
                FACULTY_NAME: facultyAndSubjects[0].FACULTY_NAME,
                SUBJECTS: subjects.flatMap(subject => subject)
            }


        WriteJson(req, res, facultyAndSubjectsFormatted);
        return;
    }

    if (RegExp('^/api/auditoriumtypes/[^/]*/auditoriums/?$').test(path)) {
        let auditoriumType = path.split('/')[3];
        let auditoriums = await models.AUDITORIUM.findAll(
            {
                where: {AUDITORIUM_TYPE: `${auditoriumType}`},
                include: [
                    {
                        model: models.AUDITORIUM_TYPE, as: "AUDITORIUM_TYPE_AUDITORIUM_TYPE", required: true
                    }
                ]
            }
        )
        WriteJson(req, res, auditoriums);
        return;
    }

    if (path === "/api/testScope") {
        let tenToSixty = await models.AUDITORIUM.scope('tenToSixty').findAll();
        WriteJson(req, res, tenToSixty);
        return;
    }

    if (path === "/api/transaction") {
        let t = await Sequalize.transaction();

        await models.AUDITORIUM.update({AUDITORIUM_CAPACITY: 0}, {
            transaction: t,
            where: {
                AUDITORIUM_CAPACITY: {
                    [seq.Op.gt]: 0
                }
            }
        });
        let audits = await models.AUDITORIUM.findAll({transaction: t});
        setTimeout(async () => {
            await t.rollback();
        }, 10000);
        WriteJson(req, res, audits);
        res.writeHead(200, {'Content-Type': 'text/json'});
        return;

    }


    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Not Found');


}