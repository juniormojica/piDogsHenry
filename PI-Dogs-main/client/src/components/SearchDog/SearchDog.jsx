import s from "./SearchDog.module.css"


const SearchDog = ({ name, id, weight, created, image }) => {
    return (
        <div>
            <h1>{name}</h1>
            <h4>Id:<br />{id}</h4>
            <h4>Peso<br />{weight}</h4>
            <h4>{created}</h4>
            <img className={s.cardImage} src={image} alt={name} />
        </div>
    )
}

export default SearchDog