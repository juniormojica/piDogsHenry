const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Temperaments", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,


        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false
    })
}

// {  "name":"El perritu malo de california",
// "height": {
//     "metric": "5-48 cm"
// },
// "weight": {
//     "metric": "58-41 cm"
// },
// "life_span": "10-12 years",
//     "image": "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg"
// }