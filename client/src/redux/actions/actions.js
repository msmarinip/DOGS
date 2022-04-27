import axios from 'axios'
import { GET_DOG__BYID, 
        GET_DOGS, 
        IS_LOADING,
        CHANGE_PAGE,
        REMOVE_SELECTED_DOG,
        CHANGE_ORDER,
        ORDER_CHANGED
} from "../types/types";

export const isLoading = () => {
    return {
        type: IS_LOADING
    }
}

export const changePage = (page) => {
    return {
        type: CHANGE_PAGE,
        payload: page
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

export const reOrder = (by, direction) => {
    
    return {
        type: ORDER_CHANGED
    }
}
export const getDogByID =  (id) => {
    
    return async (dispatch) =>{
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
            dispatch({ type: GET_DOG__BYID, payload: response.data })
        } catch (error) {
            console.log(error)
        }
    }
}

export const removeSelectedDog = () => {
    return {
        type: REMOVE_SELECTED_DOG
    }
}


export const getDogs = () =>{
    return async (dispatch) => {

        try {
            const response = await axios.get(`http://localhost:3001/dogs/`);
            dispatch({ type: GET_DOGS, payload: response.data })
        } catch (error) {
            console.log(error)
        }
    }
}
