import { createSlice } from "@reduxjs/toolkit";

const initialProduct ={
    products:[
        {
            title:"first product",
            image:"",
            price:3000,

        }
    ]
};
export const productState = createSlice({
 name:"productState",
 initialState:initialProduct,
 reducers:{
    addProduct:(state, action)=>{
       state.products = action.payload;
    }
 }
})

export const {addProduct} = productState.actions;
export default productState.reducer;