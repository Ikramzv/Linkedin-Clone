import { SET_LOADING_STATUS , GET_ARTICLES , DELETE_DOCUMENT } from "../actions/actionType"

export const initState = {
    articles: [],
    loading: false,
}

const articleReducer = (state = initState , action) => {
    switch(action.type){
        case GET_ARTICLES: 
            return  {
                ...state,
                articles: action.payload
            }
        case SET_LOADING_STATUS :
            return  {
                ...state,
                loading: action.status
            }
        case DELETE_DOCUMENT:
            console.log('Document deleted' , state)
            return {
                ...state,
                loading: action.status
            }
        default:
            return state
    }
}

export default articleReducer