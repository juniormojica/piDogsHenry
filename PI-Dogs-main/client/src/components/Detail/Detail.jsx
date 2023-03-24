import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { dogDetail } from "../../redux/actions"
import { cleanDetail } from "../../redux/actions";
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
            {dogDetails && (<div>
                <h3>{dogDetails?.name}</h3>
                <h3>Altura: <br />{dogDetails?.height}</h3>
                <h3>peso: <br />{dogDetails?.weight}</h3>
                <h3>{dogDetails?.id}</h3>

                {dogDetails.id && idOrigin(dogDetails.id) ? (<img src={dogDetails.image} />) : (<img src={`https://cdn2.thedogapi.com/images/${dogDetails.id_image}.jpg`} alt={dogDetails.name} />)}

                <h3>{dogDetails?.life_span}</h3>
                <h3>{dogDetails?.temperament}</h3>
                <div>
                    <button onClick={goBack}>Regresar</button>
                </div>
            </div>)}
        </>



    )
}


export default Detail