import fs from "fs";
import WriteJson from "../Helpers/WriteJson.js";
import MapModel from "../Helpers/EndpointsModelMap.js";
import url from 'node:url';


export default async function GetHandler(req, res, models) {
    let path = decodeURI(req.url);

    console.log(req.method + ' ' + path);
    const endpoints = MapModel(models);

    if (path === "/") {

        res.end(fs.readFileSync("LABA19/index.html"));
        return;
    }
    if (path in endpoints) {
        let model = endpoints[path];
        let instances = await model.findMany();
        WriteJson(req, res, instances);
        return;
    }
    if (RegExp('^/api/faculties/[^/]*/subjects/?$').test(path)) {
        let faculty = path.split('/')[3];
        let facultyAndSubjects = await models.fACULTY.findMany(
            {
                where: {FACULTY: `${faculty}`},
                select: {
                    FACULTY: true,
                    PULPIT_PULPIT_FACULTYToFACULTY: {
                        select: {
                            PULPIT: true,
                            SUBJECT_SUBJECT_PULPITToPULPIT:
                                {
                                    select: {SUBJECT_NAME: true}
                                },

                        }
                    }

                },

            }
        )


        WriteJson(req, res, facultyAndSubjects);
        return;
    }

    if (RegExp('^/api/auditoriumtypes/[^/]*/auditoriums/?$').test(path)) {
        let auditoriumType = path.split('/')[3];
        let auditoriums = await models.aUDITORIUM_TYPE.findMany(
            {
                where: {AUDITORIUM_TYPE: auditoriumType},
                select: {
                    AUDITORIUM_TYPE: true,
                    AUDITORIUM_AUDITORIUM_AUDITORIUM_TYPEToAUDITORIUM_TYPE:
                        {
                            select: {AUDITORIUM: true}
                        }


                }
            }
        )
        WriteJson(req, res, auditoriums);
        return;
    }


    if (path === "/api/auditoriumsWithComp1") {
        let auditoriums = await models.aUDITORIUM.findMany(
            {
                where: {
                    AUDITORIUM_TYPE: "ЛБ-К",
                    AUDITORIUM_NAME: {
                        endsWith: "1"
                    }
                },

            }
        )
        WriteJson(req, res, auditoriums);
        return;

    }
    if (path === "/api/puplitsWithoutTeachers") {
        let pulpits = await models.pULPIT.findMany(
            {
                where: {
                    TEACHER_TEACHER_PULPITToPULPIT: {
                        none: {}
                    }
                }
            }
        )
        WriteJson(req, res, pulpits);
        return;

    }
    if (path === "/api/pulpitsWithVladimir") {
        let pulpits = await models.pULPIT.findMany(
            {
                where: {
                    TEACHER_TEACHER_PULPITToPULPIT: {
                        some: {
                            TEACHER_NAME: {
                                contains: "Владимир"
                            }
                        }
                    }
                }
            }
        )
        WriteJson(req, res, pulpits);
        return;

    }
    if (path === "/api/auditoriumsSameCount") {
        let auditoriums = await models.aUDITORIUM.groupBy(
            {
                by: ["AUDITORIUM_TYPE", "AUDITORIUM_CAPACITY"],
                _count: true

            }
        )
        WriteJson(req, res, auditoriums);
        return;

    }
    if (path === "/api/fluidTest") {
        let auditoriums = await models.aUDITORIUM_TYPE.findFirst(
            {
                where: {
                    AUDITORIUM_TYPE: "ЛК"
                }
            }).AUDITORIUM_AUDITORIUM_AUDITORIUM_TYPEToAUDITORIUM_TYPE();


        WriteJson(req, res, auditoriums);
        return;

    }
    if (url.parse(req.url).pathname === "/api/facultiesPage") {

        let page = +url.parse(req.url, true).query.page;

        let facultiesCount = await models.pULPIT.findMany(

        );


        let skip = (page - 1) * 10

        if (skip > facultiesCount.length || page < 0) {

            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end("Out of bounds");
            return;

        }


        let pulpits = await models.pULPIT.findMany(
            {
                skip: skip,
                take: 10,
                include: {
                    _count: {
                        select: {
                            TEACHER_TEACHER_PULPITToPULPIT: true
                        }
                    }
                }

            }
        )

        WriteJson(req, res, pulpits);
        return;

    }
    if (path === "/api/transaction") {
        try {
            await models.$transaction(async (models) => {
                await models.aUDITORIUM.updateMany({
                    data: {
                        AUDITORIUM_CAPACITY: {increment: 100}
                    },
                });

                const auditoriums = await models.aUDITORIUM.findMany({
                    select: {
                        AUDITORIUM_CAPACITY: true
                    }
                });

                WriteJson(req, res, auditoriums)
                return Promise.reject();
            });

        } catch (err) {


        }

        return;

    }


    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Not Found');


}