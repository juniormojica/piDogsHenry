import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { getTemperaments, filterTable } from "../../redux/actions"

import s from "./TempFilter.module.css"



const TempFilter = () => {
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const dogs = useSelector((state) => state.allDogs)
    const [filter, setFilter] = useState([])
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
        dispatch(filterTable(dogs))
    }

    const handleOrigin = (event) => {
        const inputValue = event.target.value

        console.log(inputValue);
        if (inputValue === "true") {
            const infoFromDb = dogs.filter((dog) => dog.created === true)

            setFilter(infoFromDb)
            return dispatch(filterTable(infoFromDb))
        }
        if (inputValue === "false") {
            const infoFromApi = dogs.filter((dog) => dog.created === false)
            setFilter(infoFromApi)

            return dispatch(filterTable(infoFromApi))

        }

        console.log("entra acá");
        dispatch(filterTable(dogs))





    }

    console.log(dogs);

    const handleOrder = (event) => {
        const inputValue = event.target.value;

        if (inputValue === "az") {
            const sortedDogs = [...dogs].sort(function (a, b) { // hacer una copia con spread operator
                return a.name.localeCompare(b.name);
            });
            dispatch(filterTable(sortedDogs));
        } else if (inputValue === "za") {
            const sortedDogs = [...dogs].sort(function (a, b) { // hacer una copia con spread operator
                return b.name.localeCompare(a.name);
            });
            dispatch(filterTable(sortedDogs));
        }
    }


    //>>>>>>>>>>>RENDERIZADO >>>>>>>>>>>>>>>>>>>>>>>

    return (
        <>
            <div className={s.tempContainer}>
                <h2>Filtrar Temperamentos</h2>

                {/* SELECCIONAR TEMPERAMENTOS */}
                <div className={s.selectTempContainer}>
                    <h4 className={s.style} >Temperamentos:</h4>
                    {temperaments && (
                        <select className={s.style} name="temperaments" onChange={handleSearch}>
                            {temperaments.map((temp) => {
                                return <option key={temp.id} value={temp.name}>{temp.name}</option>
                            })}


                        </select>
                    )}


                </div>
                {/* SELECCIONAR ORIGEN */}

                <div className={s.originContainer}>
                    <h4 className={s.style} >Origen:</h4>
                    <select className={s.style} onChange={handleOrigin} name="origen" id="">
                        <option value="select">Seleccionar</option>
                        <option value="todos">Todos</option>
                        <option value="true">Data Base</option>
                        <option value="false">Api</option>
                    </select>

                </div>
                {/* ORDEN ALFABETICO */}
                <div className={s.orderContainer}>
                    <h4 className={s.style} >Orden Alfabetico:</h4>
                    <select className={s.style} onChange={handleOrder} name="order" id="">
                        <option value="selec">Seleccionar</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>

                    </select>


                </div>

                <div className={s.pesoContainer}>
                    <h4 className={s.style} >Peso:</h4>
                    <select className={s.style} onChange={handleOrder} name="order" id="">
                        <option value="todos">Mayor-Menor</option>
                        <option value="true">Menor-Mayor</option>

                    </select>


                </div>
                <button className={s.button} onClick={cleanFilter}>REMOVER FILTROS</button>

            </div>




        </>

    )
}










export default TempFilter