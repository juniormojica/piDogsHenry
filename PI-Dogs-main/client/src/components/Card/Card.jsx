
import s from "./Card.module.css"


const Card = ({ name, id, weight, image, created }) => {

    return (<div className={s.cardContainer}>

        <h3>{name}</h3>
        <h4>{id}</h4>
        <h4>{weight}</h4>
        <h4>{created}</h4>
        <img className={s.cardImage} src={image} alt={name} />
    </div>)
}

export default Card 