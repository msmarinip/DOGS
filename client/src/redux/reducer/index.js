import { CHANGE_ORDER, CHANGE_PAGE, GET_DOGS, GET_DOG__BYID, IS_LOADING, ORDER_CHANGED, REMOVE_SELECTED_DOG } from "../types/types";

const initialState = {
    dogs: [],
    selectedDog: {},
    listTemperaments: [],
    page: 1,
    orderBy: ['name', 'ASC'],
    isLoading: false,
    cantPages: 1
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
                    ? payload.sort((a,b) => (a[state.orderBy[0]] >= b[state.orderBy[0]]) ? -1 : 1)
                    : payload.sort((a,b) => (a[state.orderBy[0]] >= b[state.orderBy[0]]) ? 1 : -1)
                    ,
            // dogs: (state.orderBy[1] === 'DESC') 
            // ? payload.sort((a,b) => {
            //     if(a[state.orderBy[0]] > b[state.orderBy[0]]) return -1;
            //     else if(a[state.orderBy[0]] < b[state.orderBy[0]]) return  1;
            //     else return 0;
            // })
            // : payload.sort((a,b) => {
            //     if(a[state.orderBy[0]] > b[state.orderBy[0]]) return 1;
            //     else if(a[state.orderBy[0]] < b[state.orderBy[0]]) return  -1;
            //     else return 0;
            // }),
            cantPages: Math.ceil(payload.length/8),
            isLoading: false
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
            })
  
        }
    case ORDER_CHANGED:
        return {
            ...state,
            dogs: (state.orderBy[1] === 'DESC') 
            ? state.dogs.sort((a,b) => {
                // if(a[state.orderBy[0]] > b[state.orderBy[0]]) return -1;
                // else if(a[state.orderBy[0]] < b[state.orderBy[0]]) return  1;
                // else return 0;
                return b[state.orderBy[0]] - a[state.orderBy[0]];
            })
            : state.dogs.sort((a,b) => {
                // if(a[state.orderBy[0]] > b[state.orderBy[0]]) return 1;
                // else if(a[state.orderBy[0]] < b[state.orderBy[0]]) return  -1;
                // else return 0;
                return a[state.orderBy[0]] - b[state.orderBy[0]]
            }),
            
            page:1,
            isLoading: false
        }
    default:
        return {...state};
}
    
}

