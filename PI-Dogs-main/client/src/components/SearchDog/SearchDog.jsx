import s from "./SearchDog.module.css"
import { Link } from "react-router-dom"

const SearchDog = ({ name, id, weight, created, image }) => {

    return (<>

        < div className={s.cardContainer} >
            <Link to={`/detail/${id}`}><h1>{name}</h1></Link>
            <h4>Id:<br />{id}</h4>
            <h4>Peso<br />{weight}</h4>
            <h4>{created}</h4>
            <img className={s.cardImage} src={image} alt={name} />
        </div >
    </>


    )
}

export default SearchDog