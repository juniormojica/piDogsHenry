const { Temperaments } = require("../db")
require("dotenv").config();
const axios = require("axios")
const { API_KEY } = process.env;

const getTemps = async () => {
    const URL = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`
    const response = await axios.get(URL)

    const allArray = response.data

    const tempers = allArray.map(dog => dog.temperament ? dog.temperament : '').map(str => str?.split(', '));

    const onlyTempers = new Set(tempers.flat());



    const newArr = Array.from(onlyTempers)


    newArr.map(async temp => {
        await Temperaments.findOrCreate({
            where: { name: temp }
        })
    })

    const result = await Temperaments.findAll({ order: [['id', 'ASC']] })

    if (result) return result

    throw Errror("Something bad happens")


}

module.exports = {
    getTemps
}

//_________________________________________________________________________________________

