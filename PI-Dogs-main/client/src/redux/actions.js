import axios from "axios"
export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_DOG_DETAIL = "GET_DOG_DETAIL"
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const HIDE_CARDS = "HIDE_CARDS";
export const SHOW_CARDS = "SHOW_CARDS"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const DOGS_BY_NAME = "DOGS_BY_NAME"
export const FILTER_TABLE = "FILTER_TABLE"
export const FILTER_ORIGIN_TABLE = "FILTER_ORIGIN_TABLE"
export const FILTER_ORDER_TABLE = "FILTER_ORDER_TABLE"
export const CLEAN_ALL_FILTER = "CLEAN_ALL_FILTER"
export const FILTER_WEIGHT_TABLE = "FILTER_WEIGHT_TABLE"


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

export const filterTable = (value, dogs) => {

    const filteredDogs = dogs.filter((dog) => {
        if (typeof dog.Temperaments === "string") {

            return dog.Temperaments.toLowerCase().includes(value.toLowerCase());
        } else if (Array.isArray(dog.Temperaments)) {

            const tempNames = dog.Temperaments.map((temperament) => temperament.name);
            return tempNames.some((name) => name.toLowerCase().includes(value.toLowerCase()));
        }
        return false; // Ignore dogs with undefined Temperaments
    });
    return { type: FILTER_TABLE, payload: filteredDogs };
};

export const filterOriginTable = (value, dogs) => {
    if (value === "true") {
        const infoFromDb = dogs.filter((dog) => dog.created === true);
        return { type: FILTER_ORIGIN_TABLE, payload: infoFromDb };
    } else {
        const infoFromApi = dogs.filter((dog) => dog.created === false);
        return { type: FILTER_ORIGIN_TABLE, payload: infoFromApi };
    }
};

export const filterOrderTable = (value, dogs) => {
    if (value === "az") {
        const sortedDogs = [...dogs].sort(function (a, b) { // hacer una copia con spread operator
            return a.name.localeCompare(b.name);
        });
        return { type: FILTER_ORDER_TABLE, payload: sortedDogs };

    } else if (value === "za") {
        const sortedDogs = [...dogs].sort(function (a, b) { // hacer una copia con spread operator
            return b.name.localeCompare(a.name);
        });

        return { type: FILTER_ORDER_TABLE, payload: sortedDogs };

    }
};

export const filterWeightTable = (value, dogs) => {
    if (value === "menor") {
        const sortedDogs = dogs.map((dog) => {
            const arrNumber = dog.weight.split("-").map(weight => parseInt(weight))
            const sum = (arrNumber[0] + arrNumber[1]) / 2

            return { ...dog, weight: sum };
        })

        const result = sortedDogs.sort((a, b) => a.weight - b.weight);
        return { type: FILTER_WEIGHT_TABLE, payload: result };
    }

    if (value === "mayor") {
        const sortedDogs = dogs.map((dog) => {
            const arrNumber = dog.weight.split("-").map(weight => parseInt(weight))
            const sum = (arrNumber[0] + arrNumber[1]) / 2

            return { ...dog, weight: sum };
        })

        const result = sortedDogs.sort((b, a) => a.weight - b.weight);
        return { type: FILTER_WEIGHT_TABLE, payload: result };
    }
};



export const cleanAllFilters = (dogs) => {
    return { type: CLEAN_ALL_FILTER, payload: dogs };
};

