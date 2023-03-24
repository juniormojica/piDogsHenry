import s from "./SearchBar.module.css"
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { hideCards, showCards } from "../../redux/actions"
import SearchDog from "../SearchDog/SearchDog";
const SearchBar = () => {

    const navigate = useNavigate

    const dispatch = useDispatch()
    const [dogSearched, setDogSearched] = useState([])
    const allDogs = useSelector((state) => state.allDogs)

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8)

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
    const pages = []

    for (let i = 1; i <= Math.ceil(dogSearched.length / itemsPerPage); i++) {
        pages.push(i)
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dogSearched.slice(indexOfFirstItem, indexOfLastItem)

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    }

    const renderPages = pages.map((num) => {
        return (
            <li
                onClick={handleClick}
                key={num}
                id={num}
                className={currentPage == num ? `${s.active} ` : null}>{num}</li >
        )
    })




    return (
        <>
            <ul className={s.pageNumbers}>
                {renderPages}
            </ul>
            <div className={`${s.center}`}>
                <input onChange={searchByName} placeholder="BUSCAR RAZA..." type='search' className={`${s.search} `} />

            </div>
            <div className={s.filterContainer}>
                {dogSearched && currentItems.map((dog) => {
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
        </>

    )
}




export default SearchBar;