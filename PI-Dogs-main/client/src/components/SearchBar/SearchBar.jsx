import s from "./SearchBar.module.css"


import { useDispatch } from "react-redux";
import { filterbyname } from "../../redux/actions"


const SearchBar = () => {

    const dispatch = useDispatch()

    const searchByName = (event) => {
        let searchedDog = event.target.value
        dispatch(filterbyname(searchedDog))
    }

    return (
        <>

            <div className={`${s.center}`}>
                <input onChange={searchByName} placeholder="BUSCAR RAZA..." type='search' className={`${s.search} `} />

            </div>



        </>

    )
}




export default SearchBar;