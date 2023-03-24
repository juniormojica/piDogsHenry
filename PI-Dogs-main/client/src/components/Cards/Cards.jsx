import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getAllDogs } from '../../redux/actions';
import Card from '../Card/Card';
import s from "./Cards.module.css"


const Cards = () => {

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.allDogs)
    const [dogs, setDogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8)


    const [pageNumberlimit, SetNumberLimit] = useState(5)
    const [maxPageNumberLimit, SetmaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, SetminPageNumberLimit] = useState(1)

    console.log(dogs);
    const pages = []

    for (let i = 1; i <= Math.ceil(dogs.length / itemsPerPage); i++) {
        pages.push(i)
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dogs.slice(indexOfFirstItem, indexOfLastItem)


    useEffect(() => {

        dispatch(getAllDogs())


    }, [])
    useEffect(() => {
        allDogs && setDogs(allDogs)
    }, [allDogs])

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    }

    const renderPages = pages.map((num) => {

        if (num < maxPageNumberLimit + 1 && num >= minPageNumberLimit) {
            return (
                <li
                    onClick={handleClick}
                    key={num}
                    id={num}
                    className={currentPage == num ? `${s.active} ` : null}>{num}</li >
            )
        } else { return null }

    })

    const handleNextButton = () => {
        setCurrentPage(currentPage + 1)

        if (currentPage + 1 > maxPageNumberLimit) {
            SetmaxPageNumberLimit(maxPageNumberLimit + pageNumberlimit)
            SetminPageNumberLimit(minPageNumberLimit + pageNumberlimit)
        }
    }
    const handlePrevButton = (event) => {
        setCurrentPage(currentPage - 1)

        if ((currentPage - 1) % pageNumberlimit === 0) {
            SetmaxPageNumberLimit(maxPageNumberLimit - pageNumberlimit)
            SetminPageNumberLimit(minPageNumberLimit - pageNumberlimit)
        }
    }

    let pageIncrementBtn = null

    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextButton}>&hellip;</li>
    }

    let pageDecrementBtn = null
    if (pages.length > maxPageNumberLimit) {
        pageDecrementBtn = <li onClick={handlePrevButton}>&hellip;</li>
    }



    return (<>
        <ul className={s.pageNumbers}>


            <li><button onClick={handlePrevButton}
                disabled={currentPage === pages[0] ? true : false}>

                Prev
            </button></li>

            {pageDecrementBtn}
            {renderPages}
            {pageIncrementBtn}
            <li><button onClick={handleNextButton}
                disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</button></li>

        </ul>

        <div className={s.CardsContainer}>
            {dogs && currentItems.map((dog) => {
                return <Card key={dog.id}
                    name={dog.name}
                    id={dog.id}
                    weight={dog.weight}
                    image={dog.image}
                    created={dog.created}
                    Temperaments={dog.Temperaments}
                />
            })}
        </div>

    </>


    )

}

export default Cards