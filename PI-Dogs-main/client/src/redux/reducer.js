
import {
    CLEAN_DETAIL,
    GET_ALL_DOGS,
    GET_DOG_DETAIL,
    HIDE_CARDS,
    GET_TEMPERAMENTS,
    SHOW_CARDS, DOGS_BY_NAME,
    LOAD_DOGS_FOR_FILTER
} from "../redux/actions"
const initialState = {
    allDogs: [],
    dogDetail: {},
    hideCards: true,
    temperaments: [],
    nameOfDog: "",


}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_DOGS:

            return { ...state, allDogs: payload }

        case GET_DOG_DETAIL:
            return { ...state, dogDetail: payload }

        case GET_TEMPERAMENTS:

            return { ...state, temperaments: payload }

        case CLEAN_DETAIL:
            return { ...state, dogDetail: payload }

        case HIDE_CARDS:
            return { ...state, hideCards: payload }

        case SHOW_CARDS:
            return { ...state, hideCards: payload }

        case DOGS_BY_NAME:
            return { ...state, nameOfDog: payload }



        default:
            return { ...state, dogsForFilter: payload }
    }
}

export default reducer