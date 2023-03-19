
import {
    CLEAN_DETAIL,
    GET_ALL_DOGS,
    GET_DOG_DETAIL,
    HIDE_CARDS,
    showCards,
    SHOW_CARDS
} from "../redux/actions"
const initialState = {
    allDogs: [],
    dogDetail: {},
    hideCards: true

}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_DOGS:

            return { ...state, allDogs: payload }

        case GET_DOG_DETAIL:
            return { ...state, dogDetail: payload }

        case CLEAN_DETAIL:
            return { ...state, dogDetail: payload }

        case HIDE_CARDS:
            return { ...state, hideCards: payload }

        case SHOW_CARDS:
            return { ...state, hideCards: payload }
        default:
            return { ...state }
    }
}

export default reducer