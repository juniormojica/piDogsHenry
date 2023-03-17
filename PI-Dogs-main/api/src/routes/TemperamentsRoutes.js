const { Router } = require("express")

const { getAllTemperaments } = require("../handlers/TemperamentsHandlers")
const tempsRoutes = Router()

tempsRoutes.get("/", getAllTemperaments)


module.exports = tempsRoutes;