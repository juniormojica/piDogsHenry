import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { getTemperaments } from "../../redux/actions"
import s from "./TempFilter.module.css"
// import SearchDog from "../SearchDog/SearchDog"
import Card from "../Card/Card"
const TempFilter = () => {
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const dogs = useSelector((state) => state.allDogs)
    const [filterTemp, setFilterTemp] = useState([])


    useState(() => {
        dispatch(getTemperaments())
    }, [])


    console.log(dogs);
    const handleSearch = (event) => {

        const filteredDogs = dogs.filter((dog) => {
            let police = false;
            if (typeof dog.temperaments === "string") {
                const toArr = dog.temperaments.split(",")

                const trimmedArr = toArr.map(str => str.trim()).filter(str => str !== "");

                console.log(trimmedArr);
                for (let i = 0; i < trimmedArr.length; i++) {


                    if (trimmedArr[i] === event.target.value) {
                        police = true;
                        console.log(police);
                    }

                }
                return police;
            } else {
                if (dog.temperaments && dog.temperaments.length) {
                    for (let i = 0; i < dog.temperaments.length; i++) {


                        if (dog.temperaments[i].name === event.target.value) {
                            police = true;
                            console.log(police);
                        }

                    }

                    return police;
                    // acceder a la propiedad length de Temperaments
                }

            }

        });
        console.log(filteredDogs);
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


            </div>

            <h2>Perros segun su temperamento</h2>
            <div className={s.containerDogs}>
                {
                    filterTemp && filterTemp.map((dog) => {
                        return (

                            <Card
                                name={dog.name}
                                weight={dog.weight}
                                id={dog.id}
                                image={dog.image}
                            />


                        )
                    })
                }
            </div>

        </>







    )
}

export default TempFilter