import { 
    ADD_DOG_NAME,
    CHANGE_ORDER, 
    CHANGE_PAGE, 
    CHANGE_SOURCE, 
    CLEAR_FILTERS, 
    GET_DOGS, 
    GET_DOG__BYID, 
    GET_DOG__BYNAME, 
    GET_DOG__BYTEMPERAMENT, 
    GET_TEMPERAMENTS, 
    IS_LOADING, 
    REMOVE_SELECTED_DOG } from "../types/types";

const initialState = {
    dogs: [],
    selectedDog: {},
    temperaments: [],
    page: 1,
    orderBy: ['name', 'ASC'],
    isLoading: false,
    searchBy:false,
    searchTempValues:[],
    searchName: '',
    source: '',
    dogsNames:[]
}

export default function reducer(state = initialState, {type, payload}) {

switch (type) {
    case GET_DOG__BYID:
        return {
            ...state,
            isLoading:false,
            selectedDog: payload
        }
    
    case GET_DOGS:
        return {
            ...state,
            dogs: (state.orderBy[1] === 'DESC')
                    ? payload.dogs.sort((a,b) => {
                
                        if(a[state.orderBy[0]] < b[state.orderBy[0]]) return 1;
                        else if(a[state.orderBy[0]] > b[state.orderBy[0]]) return  -1;
                        else return 0;
                    })
                    : payload.dogs.sort((a,b) => {
                        if(a[state.orderBy[0]] > b[state.orderBy[0]]) return 1;
                        else if(a[state.orderBy[0]] < b[state.orderBy[0]]) return  -1;
                        else return 0;
                    })
                    // ? payload.dogs.sort((a,b) => (a[state.orderBy[0]] >= b[state.orderBy[0]]) ? -1 : 1)
                    // : payload.dogs.sort((a,b) => (a[state.orderBy[0]] >= b[state.orderBy[0]]) ? 1 : -1)
                    ,
            
            isLoading: false,
            source: payload.source,
            dogsNames: payload.dogs.map(d => d.name.toLowerCase())

        }
    case IS_LOADING:
        return {
            ...state,
            isLoading: true
        }
    case CHANGE_PAGE: 
        return {
            ...state,
            page: payload
        }
    case REMOVE_SELECTED_DOG:
        return {
            ...state,
            selectedDog: {}
        }
    case CHANGE_ORDER: 
        return {
            ...state,
            orderBy: [payload.name, payload.direction],
            dogs: (payload.direction === 'DESC') 
            ? state.dogs.sort((a,b) => {
                
                if(a[payload.name] < b[payload.name]) return 1;
                else if(a[payload.name] > b[payload.name]) return  -1;
                else return 0;
            })
            : state.dogs.sort((a,b) => {
                if(a[payload.name] > b[payload.name]) return 1;
                else if(a[payload.name] < b[payload.name]) return  -1;
                else return 0;
            }),
            page:1,
            isLoading: false
  
        }

    case GET_DOG__BYNAME:
        return {
            ...state,
            page:1,
            dogs: payload.dogs,
            searchBy: true,
            searchName: payload.searchName,
            searchTempValues:initialState.searchTempValues
        }
    case GET_TEMPERAMENTS:
        return {
            ...state,
            temperaments: payload

        }
    case GET_DOG__BYTEMPERAMENT:
        return {
            ...state,
            dogs: payload.dogs,
            orderBy: initialState.orderBy,
            page: 1,
            searchBy: true,
            searchTempValues: payload.searchValues,
            searchName:initialState.searchName
        }
    case CLEAR_FILTERS: 
        return {
            ...state,
            searchBy: false,
            searchTempValues: initialState.searchTempValues,
            searchName:initialState.searchName,
            page:1
        }
    case CHANGE_SOURCE: 
        return {
            ...state,
            searchBy: false,
            searchTempValues: initialState.searchTempValues,
            searchName:initialState.searchName,
            page:1,
            source: payload
        }
    case ADD_DOG_NAME: 
        return {
            ...state,
            dogsNames: [...state.dogsNames, payload]
        }
    default:
        return {...state};
}
    
}

