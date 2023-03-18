import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getAllDogs } from '../../redux/actions';
import Card from '../Card/Card';
import s from "./Cards.module.css"


const Cards = () => {
    const allDogs = useSelector((state) => state.allDogs)

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(getAllDogs())


    }, [])

    return (<div className={s.CardsContainer}>
        {allDogs && allDogs.map((dog) => {
            return <Card key={dog.id}
                name={dog.name}
                id={dog.id}
                weight={dog.weight}
                image={dog.image}
                created={dog.created}
            />
        })}
    </div>

    )
}

export default Cards