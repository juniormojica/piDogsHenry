import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { getTemperaments } from "../../redux/actions"
import s from "./TempFilter.module.css"
import SearchDog from "../SearchDog/SearchDog"
const TempFilter = () => {
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const dogs = useSelector((state) => state.allDogs)
    const [filterTemp, setFilterTemp] = useState([])


    useState(() => {
        dispatch(getTemperaments())
    }, [filterTemp])



    const handleSearch = (event) => {

        const filteredDogs = dogs.filter((dog) => {
            let police = false;
            if (typeof dog.Temperaments === "string") {
                const toArr = dog.Temperaments.split(",")

                const trimmedArr = toArr.map(str => str.trim()).filter(str => str !== "");


                for (let i = 0; i < trimmedArr.length; i++) {


                    if (trimmedArr[i] === event.target.value) {
                        police = true;
                        console.log(police);
                    }

                }
                return police;
            } else {
                if (dog.Temperaments && dog.Temperaments.length) {
                    for (let i = 0; i < dog.Temperaments.length; i++) {


                        if (dog.Temperaments[i].name === event.target.value) {
                            police = true;
                            console.log(police);
                        }

                    }
                    return police;
                    // acceder a la propiedad length de Temperaments
                }

            }

        });
        setFilterTemp(filteredDogs)

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

    //>>>>>>>>>>>RENDERIZADO >>>>>>>>>>>>>>>>>>>>>>>

    return (
        <div>

            <div>
                <h4>Filtrar Temperamento</h4>
                {temperaments && (
                    <select name="temperaments" onChange={handleSearch}>
                        {temperaments.map((temp) => {
                            return <option key={temp.id} value={temp.name}>{temp.name}</option>
                        })}


                    </select>
                )}
                <button onClick={cleanFilter}>Quitar Filtro</button>

                <div className={s.originContainer}>
                    <label htmlFor="">Origen</label>
                    <select onChange={handleOrigin} name="origen" id="">
                        <option value="todos">Todos</option>
                        <option value="true">Data Base</option>
                        <option value="false">Api</option>
                    </select>
                </div>


            </div>

            <h2>Perros segun su temperamento</h2>
            <div className={s.containerDogs}>
                {
                    filterTemp && filterTemp.map((dog) => {
                        return (

                            <SearchDog
                                name={dog.name}
                                weight={dog.weight}
                                id={dog.id}
                                image={dog.image}
                            />


                        )
                    })
                }
            </div>





        </div>
    )
}

export default TempFilter