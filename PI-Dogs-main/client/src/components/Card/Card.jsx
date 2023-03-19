import { Link } from "react-router-dom"
import s from "./Card.module.css"
import { useSelector } from "react-redux"


const Card = ({ name, id, weight, image, created }) => {



    const { hideCards } = useSelector((state) => state)
    console.log(hideCards);

    return (<div className={`${s.cardContainer} ${!hideCards ? s.showCards : ""}`}>
        <Link to={`/detail/${id}`}><h3>Nombre: <br /> {name}</h3></Link>

        <h4>Id:<br />{id}</h4>
        <h4>Peso<br />{weight}</h4>
        <h4>{created}</h4>
        <img className={s.cardImage} src={image} alt={name} />
    </div>)
}





export default Card 