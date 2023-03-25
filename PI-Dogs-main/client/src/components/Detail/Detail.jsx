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
    const tempDb = (temps) => {
        if (!temps) {
            return null;
        }

        const temperamentsDb = temps.map((temp) => {
            return temp.name;
        });
        const tempsDb = temperamentsDb.join(", ");

        return (<h4>{tempsDb}</h4>);
    };

    console.log(dogDetails.Temperaments);

    return (
        <>
            <div className={s.buttonContainer}>
                <button onClick={goBack}>Regresar</button>
            </div>
            {dogDetails && (
                <div className={s.detailContainer}>
                    <div className={s.textInfo}>
                        <h2 className={s.style} >{dogDetails?.name}</h2>

                        <h3 className={s.style} >Altura: {dogDetails?.height}</h3>
                        <h3 className={s.style} >peso: {dogDetails?.weight}</h3>
                        <h3 className={s.style} >{dogDetails?.life_span}</h3>





                        {dogDetails && (typeof dogDetails.Temperaments === "string" ? (
                            <h4>{dogDetails.Temperaments}</h4>
                        ) : (
                            tempDb(dogDetails.Temperaments)

                        ))}
                        <h3 className={s.style} > ID: {dogDetails?.id}</h3>
                    </div>

                    <div className={s.imgContainer}>
                        {dogDetails.id && idOrigin(dogDetails.id) ? (<img className={s.cardImage} src={dogDetails.image} />) : (<img src={`https://cdn2.thedogapi.com/images/${dogDetails.id_image}.jpg`} alt={dogDetails.name} className={s.cardImage} />)}

                    </div>

                </div>)}
        </>



    )
}


export default Detail