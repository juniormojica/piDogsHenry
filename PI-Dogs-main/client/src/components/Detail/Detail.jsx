import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { dogDetail } from "../../redux/actions"
import { cleanDetail } from "../../redux/actions";
import s from "./Detail.module.css"
const Detail = () => {
    const navigate = useNavigate()
    const dogDetails = useSelector((state) => state.dogDetail)
    const dispatch = useDispatch()
    const { id } = useParams()


    useEffect(() => {
        dispatch(dogDetail(id))
        return () => {
            dispatch(cleanDetail())
        }
    }, [])

    const goBack = () => {
        navigate("/home")
    }

    const idOrigin = (id) => {
        if (typeof id === "number") {
            return false
        } else {
            return true
        }
    }


    return (
        <>
            <div className={s.buttonContainer}>
                <button onClick={goBack}>Regresar</button>
            </div>
            {dogDetails && (<div className={s.detailContainer}>
                <h2 className={s.style} >{dogDetails?.name}</h2>

                <h3 className={s.style} >Altura: {dogDetails?.height}</h3>
                <h3 className={s.style} >peso: {dogDetails?.weight}</h3>
                <h3 className={s.style} >{dogDetails?.life_span}</h3>

                <div className={s.imgContainer}>
                    {dogDetails.id && idOrigin(dogDetails.id) ? (<img className={s.cardImage} src={dogDetails.image} />) : (<img src={`https://cdn2.thedogapi.com/images/${dogDetails.id_image}.jpg`} alt={dogDetails.name} className={s.cardImage} />)}

                </div>

                <h3 className={s.style} >{dogDetails?.id}</h3>

                <h3 className={s.style} >{dogDetails?.temperament}</h3>

            </div>)}
        </>



    )
}


export default Detail