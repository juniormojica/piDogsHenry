import s from "./SearchBar.module.css"
import { useSelector } from "react-redux";
import { useState } from "react";

import { useDispatch } from "react-redux";

import { hideCards, showCards } from "../../redux/actions"
import SearchDog from "../SearchDog/SearchDog";
const SearchBar = () => {

    const dispatch = useDispatch()
    const [dogSearched, setDogSearched] = useState([])
    const allDogs = useSelector((state) => state.allDogs)

    const searchByName = (event) => {
        const value = event.target.value
        const formatValue = value.toLowerCase()


        formatValue.length ? dispatch(hideCards()) : dispatch(showCards())

        const match = allDogs.filter((dog) => {
            const dogName = dog.name.toLowerCase()
            return dogName.includes(formatValue)
        })



        setDogSearched(match)
        if (!formatValue) {
            setDogSearched([])
        }
        console.log(dogSearched);

    }
    return (
        <div className={`${s.center}`}>
            <input onChange={searchByName} placeholder="Escribe la raza" type='search' className={`${s.search} `} />

            {dogSearched && dogSearched.map((dog) => {
                return (

                    <SearchDog
                        name={dog.name}
                        weight={dog.weight}
                        id={dog.id}
                        image={dog.image}
                    />


                )
            })}
        </div>
    )
}




export default SearchBar;