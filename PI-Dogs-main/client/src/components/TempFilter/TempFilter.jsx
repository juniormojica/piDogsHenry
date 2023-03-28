import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { getTemperaments, } from "../../redux/actions"
import s from "./TempFilter.module.css"
// import SearchDog from "../SearchDog/SearchDog"
import Card from "../Card/Card"
import { legacy_createStore } from "redux"
const TempFilter = () => {
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const dogs = useSelector((state) => state.allDogs)

    const [filterTemp, setFilterTemp] = useState([])
    const [dogsForFilter, setDogsForFilter] = useState([])


    useState(() => {
        dispatch(getTemperaments())

    }, [dogs])


    useState(() => {
        const response = dogs.map((dog) => {
            if (Array.isArray(dog.Temperaments)) {
                const eachTemp = dog.Temperaments.map((temp) => temp.name)
                const some = eachTemp.join(",")

                console.log(Array.from(some).join(" "));

                return { ...dog, Temperaments: some }

            } else {


                return { ...dog }
            }

        })

        response && setDogsForFilter(response)
    }, [dogs])



    console.log(dogsForFilter);
    const handleSearch = (event) => {
        const value = event.target.value



        const filterDog = dogsForFilter.filter((dog) => value.includes(dog.Temperaments
        ))
        console.log(filterDog);


    }








    const cleanFilter = () => {
        setFilterTemp([])
    }

    const handleOrigin = (event) => {
        const inputValue = event.target.value
        if (!inputValue) {
            const infoFromDb = filterTemp.filter((dog) => dog.created === false)
            setFilterTemp(infoFromDb)
        } else if (inputValue) {
            const infoFromDb = filterTemp.filter((dog) => dog.created === true)
            setFilterTemp(infoFromDb)
        }


    }

    const handleOrder = () => {

    }


    //>>>>>>>>>>>RENDERIZADO >>>>>>>>>>>>>>>>>>>>>>>

    return (
        <>
            <div className={s.tempContainer}>
                <h2>Filtrar Temperamentos</h2>

                <div className={s.selectTempContainer}>
                    <h4 className={s.style} >Temperamentos:</h4>
                    {temperaments && (
                        <select className={s.style} name="temperaments" onChange={handleSearch}>
                            {temperaments.map((temp) => {
                                return <option key={temp.id} value={temp.name}>{temp.name}</option>
                            })}


                        </select>
                    )}
                    <button className={s.style} onClick={cleanFilter}>Quitar Filtro</button>

                </div>

                <div className={s.originContainer}>
                    <h4 className={s.style} >Origen:</h4>
                    <select className={s.style} onChange={handleOrigin} name="origen" id="">
                        <option value="todos">Todos</option>
                        <option value="true">Data Base</option>
                        <option value="false">Api</option>
                    </select>
                    <button className={s.style} onClick={cleanFilter}>Quitar Origen</button>
                </div>

                <div className={s.orderContainer}>
                    <h4 className={s.style} >Ordenar:</h4>
                    <select className={s.style} onChange={handleOrder} name="order" id="">
                        <option value="todos">A-Z</option>
                        <option value="true">Z-A</option>

                    </select>

                    <button className={s.style} onClick={cleanFilter}>Remover orden</button>
                </div>
                <div className={s.pesoContainer}>
                    <h4 className={s.style} >Peso:</h4>
                    <select className={s.style} onChange={handleOrder} name="order" id="">
                        <option value="todos">Mayor-Menor</option>
                        <option value="true">Menor-Mayor</option>

                    </select>

                    <button className={s.style} onClick={cleanFilter}>Remover orden</button>
                </div>

            </div>





        </>

    )
}










export default TempFilter