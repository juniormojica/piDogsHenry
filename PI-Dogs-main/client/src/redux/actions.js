import axios from "axios"
export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_DOG_DETAIL = "GET_DOG_DETAIL"
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const HIDE_CARDS = "HIDE_CARDS";
export const SHOW_CARDS = "SHOW_CARDS"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const DOGS_BY_NAME = "DOGS_BY_NAME"

export const getAllDogs = () => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/dogs`)
        return dispatch({ type: GET_ALL_DOGS, payload: response.data })
    }
}

export const dogDetail = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`)

        return dispatch({ type: GET_DOG_DETAIL, payload: response.data })
    }
}

export const hideCards = () => {

    return { type: HIDE_CARDS, payload: false }
}
export const showCards = () => {

    return { type: HIDE_CARDS, payload: true }
}
export const cleanDetail = () => {
    return { type: CLEAN_DETAIL, payload: {} }
}

//>>>>>>>>>>>>>>>>>>TEMPERAMENTOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const getTemperaments = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/temperaments")
        return dispatch({ type: GET_TEMPERAMENTS, payload: response.data })
    }
}

//>>>>>>>>>>>>>>>>>>FILTRADO POR NOMBRE DE LA RAZA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const filterbyname = (raza) => {

    return { type: DOGS_BY_NAME, payload: raza }

}

