import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { getTemperaments, filterTable, filterOriginTable, filterOrderTable, cleanAllFilters, filterWeightTable } from "../../redux/actions"

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





    console.log(dogsForFilter);
    const handleSearch = (event) => {
        const value = event.target.value

        dispatch(filterTable(value, dogs))


    }
    const handleOrigin = (event) => {
        const value = event.target.value

        dispatch(filterOriginTable(value, dogs))

    }


    const cleanFilter = () => {
        dispatch(cleanAllFilters(dogs))
    }


    const handleOrder = (event) => {
        const value = event.target.value;

        dispatch(filterOrderTable(value, dogs))

    }

    const handleWeight = (event) => {
        const value = event.target.value;
        dispatch(filterWeightTable(value, dogs))
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
                                return <option key={temp.id} value={temp.name} id="temper" >{temp.name}</option>
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
                    <select className={s.style} onChange={handleWeight} name="order" id="">
                        <option value="mayor">Mayor-Menor</option>
                        <option value="menor">Menor-Mayor</option>

                    </select>


                </div>
                <button className={s.button} onClick={cleanFilter}>REMOVER FILTROS</button>

            </div>




        </>

    )
}










export default TempFilter