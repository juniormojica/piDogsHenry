import s from "./SearchBar.module.css"
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterbyname, filterAllDogs } from "../../redux/actions"


const SearchBar = () => {

    const dispatch = useDispatch()
    const filteredDogs = useSelector((state) => state.dogsByName)
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