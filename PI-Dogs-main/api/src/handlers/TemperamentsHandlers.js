
const ULR = "https://api.thedogapi.com/v1/breeds/"
const { getTemps } = require("../controllers/TemperamentsController")
const getAllTemperaments = async (req, res) => {

    try {
        res.status(200).json(await getTemps())
    } catch (error) {
        res.status(400), json({ error: error.message })
    }

}


module.exports = {
    getAllTemperaments
}