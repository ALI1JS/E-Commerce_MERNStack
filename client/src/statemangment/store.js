import { configureStore, combineReducers }  from "@reduxjs/toolkit";
import userData from "./reducers/userstate"
import productState from "./reducers/productstate";
import  cart from "./reducers/cartstate";
import  Codes  from "./reducers/codestate";


const rootReducer =  combineReducers({
        userData:userData,
        productState:productState,
        cart:cart,
        Codes:Codes
})

export const store = configureStore({
    reducer: rootReducer
})
