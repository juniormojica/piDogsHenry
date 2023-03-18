
import {
    GET_ALL_DOGS
} from "../redux/actions"
const initialState = {
    allDogs: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_DOGS:

            return { ...state, allDogs: payload }


        default:
            return { ...state }
    }
}

export default reducer