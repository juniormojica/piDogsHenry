import axios from "axios"
export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_DOG_DETAIL = "GET_DOG_DETAIL"
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const HIDE_CARDS = "HIDE_CARDS";
export const SHOW_CARDS = "SHOW_CARDS"

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