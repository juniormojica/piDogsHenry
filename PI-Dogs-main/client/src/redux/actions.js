import axios from "axios"
export const GET_ALL_DOGS = "GET_ALL_DOGS"


export const getAllDogs = () => {
    return async (dispatch) => {
        const response = await axios.get("https://api.thedogapi.com/v1/breeds")
        return dispatch({ type: GET_ALL_DOGS, payload: response.data })
    }
}