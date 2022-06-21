import { combineReducers } from "@reduxjs/toolkit";
import articleReducer from "./articleReducer";
import UserReducer from './userReducer'

const rootReducer = combineReducers({
    userState: UserReducer,
    articleState: articleReducer
})

export default rootReducer;