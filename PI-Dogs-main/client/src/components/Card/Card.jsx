import { Link } from "react-router-dom"
import s from "./Card.module.css"

const tempDb = (temps) => {
    let temperamentsDb = temps.map((temp) => {
        return temp.name
    })
    const tempsDb = temperamentsDb.join(", ")

    return (<h4>{tempsDb}</h4>)
}

const Card = ({ name, id, weight, image, created, Temperaments }) => {

    return (<div className={`${s.cardContainer} `}>
        <Link to={`/detail/${id}`}><h3 className={s.dogName}>{name}</h3></Link>

        <h4>Peso<br />{weight}</h4>
        <h4>{created}</h4>
        <div className={s.imgContainer}>
            <img className={s.cardImage} src={image} alt={name} />
        </div>
        {typeof Temperaments === "string" ? (
            <h4>{Temperaments}</h4>
        ) : (
            tempDb(Temperaments)
        )}

        <h4><br />{id}</h4>
    </div>)
}





export default Card 