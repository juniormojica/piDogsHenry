import s from "./SearchBar.module.css"
const SearchBar = () => {
    return (
        <div className={`${s.center}`}>
            <input placeholder="Escribe la raza" type='search' className={`${s.search} `} />
            <button className={s.buttonSearch} >Agregar</button>
        </div>
    )

}

export default SearchBar;