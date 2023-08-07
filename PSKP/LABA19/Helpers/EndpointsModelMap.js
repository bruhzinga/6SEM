export default function MapModel(models) {
    return {
        "/api/faculties": models.fACULTY,
        "/api/pulpits": models.pULPIT,
        "/api/subjects": models.sUBJECT,
        "/api/teachers": models.tEACHER,
        "/api/auditoriumstypes": models.aUDITORIUM_TYPE,
        "/api/auditoriums": models.aUDITORIUM,
    }
}
