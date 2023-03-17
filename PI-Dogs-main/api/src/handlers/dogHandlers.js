
const { getAllDogs, createDog, getSingleDog, getDogs } = require("../controllers/dogController")



const dogsHandler = async (req, res) => {
    try {
        const { name } = req.query

        if (!name) {
            const allDogs = await getAllDogs();
            res.status(200).json(allDogs)
        } else {
            const dog = await getDogs(name);
            res.status(200).json(dog)
        }

    } catch (error) {
        res.status(404).send({ error: error.message })
    }
};



const dogHandler = async (req, res) => {
    try {

        const { idRaza } = req.params
        const dogFinded = await getSingleDog(idRaza)

        res.status(200).json(dogFinded)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }

};

const createDogHandler = async (req, res) => {
    try {
        const { name, height, weight, life_span, image, temperaments } = req.body
        const newDog = await createDog(name, height, weight, life_span, image, temperaments)
        res.status(200).json(newDog)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

};

module.exports = {
    dogHandler,
    dogsHandler,
    createDogHandler
}   