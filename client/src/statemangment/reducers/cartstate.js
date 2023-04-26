import {createSlice} from "@reduxjs/toolkit";


export const cart = createSlice({
     name:"cart",
     initialState:{
        Allcount: 0,
        products:[]
     },
     reducers:{
        addToCart:(state, action)=>{
            state.Allcount++;
            const existProductIndex = state.products.findIndex(
               (product)=>product.id === action.payload.id);
            
            if (existProductIndex !== -1)
            {
               state.products[existProductIndex].counter++;
            }
            else
             {
               state.products.push({
                  id: action.payload.id,
                  counter:1
               })
             }
            return(state);
        },
        removeProduct: (state,action)=>{
           state.Allcount--;
           state.products = state.products.filter((item)=> item !== action.payload.id);
           console.log(action.payload.id);
           console.log(state.products)
        }
     }
})


export const {addToCart,removeProduct} = cart.actions;
export default cart.reducer;