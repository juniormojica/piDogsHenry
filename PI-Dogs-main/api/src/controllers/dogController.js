const { Dog, Temperaments } = require("../db")
const { conn } = require("../db");
const {
    API_KEY
} = process.env;
const axios = require("axios")

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
const getAllDogs = async () => {

    const response = await axios(URL)
    const api = response.data;

    const apiData = api.map((dog) => {
        return {
            id: dog.id,
            name: dog.name,
            weight: dog.weight.metric,
            image: dog.image?.url,
            created: false

        }
    })
    const dogsDb = await Dog.findAll()
    const merge = [...dogsDb, ...apiData]
    return merge

}

const getDogs = async (name) => {

    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)
    const formatQuery = name.toLowerCase()

    const match = response.data.filter((dog) => {
        const dogName = dog.name.toLowerCase(); // convertir el nombre del perro a minúsculas
        // convertir el la query en minuscula
        return dogName.includes(formatQuery)
    })



    matchFormat = match.map((dog) => {
        return {
            id: dog.id,
            name: dog.name,
            weight: dog.weight.metric,
            image: dog.image?.url,
            created: false,
            id_image: dog.reference_image_id

        }
    })


    const dataBaseDog = await Dog.findAll({
        where: conn.where(conn.fn('LOWER', conn.col('name')), 'LIKE', '%' + formatQuery + '%')
    })

    if (dataBaseDog.length === 0 && matchFormat.length === 0) {
        throw Error("EL PERRO BUSCADO NO ESTA EN LA BASE DE DATOS NI EN LA API ")
    }

    return [...dataBaseDog, ...matchFormat]


}



const createDog = async (name, height, weight, life_span, image, temperaments) => {
    if (!name || !height || !weight || !life_span || !image || temperaments) {
        throw Error("Faltan datos para Crear su perrito")
    }
    const newDog = await Dog.create({ name, height, weight, life_span, image })
    await newDog.addTemperaments(temperaments)

    console.log(newDog.__proto__);
    return newDog;
}

const getSingleDog = async (idRaza) => {
    const convertToNumber = Number(idRaza)

    const dataFrom = !isNaN(convertToNumber) ? "api" : "db"

    if (dataFrom === "api") {

        const response = await axios.get(`${URL}/${idRaza}`)

        const api = response.data
        console.log(api);
        const formatDog = {
            id: api.id,
            name: api.name,
            image: api?.image?.url,
            height: api.height?.metric,
            weight: api.weight?.metric,
            temperament: api.temperament
        }
        return formatDog


    } else {

        const dogFinded = await Dog.findByPk(idRaza)

        if (!dogFinded) {
            throw Error("No Existe En la base De Datos")
        }

        return dogFinded
    }
}


module.exports = {
    getAllDogs,
    createDog,
    getSingleDog,
    getDogs
}