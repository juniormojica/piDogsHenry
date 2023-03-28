
import {
    CLEAN_DETAIL,
    GET_ALL_DOGS,
    GET_DOG_DETAIL,
    HIDE_CARDS,
    GET_TEMPERAMENTS,
    SHOW_CARDS, DOGS_BY_NAME,
    FILTER_TABLE,
    FILTER_ORIGIN_TABLE,
    FILTER_ORDER_TABLE,
    CLEAN_ALL_FILTER,
    FILTER_WEIGHT_TABLE
} from "../redux/actions"
const initialState = {
    allDogs: [],
    dogDetail: {},
    hideCards: true,
    temperaments: [],
    nameOfDog: "",
    filterTableDogs: []


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

        case FILTER_TABLE:
            return { ...state, filterTableDogs: payload }

        case FILTER_ORIGIN_TABLE:
            return { ...state, filterTableDogs: payload }

        case FILTER_ORDER_TABLE:
            return { ...state, filterTableDogs: payload }

        case CLEAN_ALL_FILTER:
            return { ...state, filterTableDogs: payload }

        case FILTER_WEIGHT_TABLE:
            return { ...state, filterTableDogs: payload }




        default:
            return { ...state, dogsForFilter: payload }
    }
}

export default reducer