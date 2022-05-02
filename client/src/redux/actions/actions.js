import axios from 'axios'
import { GET_DOG__BYID, 
        GET_DOGS, 
        IS_LOADING,
        CHANGE_PAGE,
        REMOVE_SELECTED_DOG,
        CHANGE_ORDER,
        GET_DOG__BYNAME,
        GET_TEMPERAMENTS,
        GET_DOG__BYTEMPERAMENT,
        CLEAR_FILTERS,
        // ADD_DOG,
        // ORDER_CHANGED
} from "../types/types";

export const isLoading = () => {
    return {
        type: IS_LOADING
    }
}
export const clearFilters = () => {
    return {
        type: CLEAR_FILTERS
    }
}
export const changePage = (page) => {
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}
export const removeSelectedDog = () => {
    return {
        type: REMOVE_SELECTED_DOG
    }
}

export const changeOrder = (by, direction) => {
    
    return {
        type: CHANGE_ORDER,
        payload: {
            name: by,
            direction
        }
    }
}

export const getDogByID =  (id) => {
    
    return async (dispatch) =>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}dogs/${id}`);
            dispatch({ type: GET_DOG__BYID, payload: response.data })
        } catch (error) {
            console.log(error)
        }
    }
}

//REACT_APP_SERVER_URL
export const getDogByName = (name, source) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}dogs?name=${name}&source=${source}`)
            dispatch({
                type: GET_DOG__BYNAME,
                payload: {
                    dogs: response.data,
                    searchName: name
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export const getDogs = (source) =>{
    return async (dispatch) => {
        console.log('o acá?',source)
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}dogs?source=${source}`);
            // const imgPng = [];
            // response.data.forEach(d => {
            //     if(d.image?.url?.split('.')[3] !== 'jpg' && Number(d.id)) imgPng.push(d.id)
            // })
            dispatch({ type: GET_DOGS, payload: {
                dogs:response.data,
                source: source
            } })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getDBTemperaments = () => {
    return async (dispatch) => {
        try {
            // console.log(`${process.env.REACT_APP_SERVER_URL}temperament`)
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}temperament/db`);
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const getTemperaments = () => {
    return async (dispatch) => {
        try {
            console.log(`${process.env.REACT_APP_SERVER_URL}temperament`)
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}temperament`);
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getDogByTemperament = (searchTemperaments, source) => {
    return async (dispatch) => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}dogs?source=${source}`);
            const dogs = response.data;
            console.log(searchTemperaments)
            const searchedDogs = [];

            
            for(let i =0; i<dogs.length; i++){
                for(let j=0; j<searchTemperaments.length; j++){
                    if(dogs[i].temperament?.split(', ').includes(searchTemperaments[j]) && !searchedDogs.includes(dogs[i])) { 
                        searchedDogs.push(dogs[i]);
                    }
                }
            }
            
            dispatch({
                type: GET_DOG__BYTEMPERAMENT,
                payload:{
                    dogs: searchedDogs,
                    searchValues:searchTemperaments
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    

}


// export const addDog = (dogToAdd) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}dogs`, dogToAdd)
//             dispatch({
//                 type: ADD_DOG,
//                 payload: response.data
//             })
            
//         } catch (error) {
//             console.log(first)
//         }
//     }
// }