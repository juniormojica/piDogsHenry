const { Router } = require("express")


//IMPORTACIONES DE LA FUNCIONES CONTROLADORAS

const {
    dogHandler,
    dogsHandler,
    createDogHandler } = require("../handlers/dogHandlers")

const dogRouter = Router();


dogRouter.get("/", dogsHandler)

dogRouter.get("/:idRaza", dogHandler)

dogRouter.post("/", createDogHandler)


module.exports = dogRouter;