import {createSlice} from "@reduxjs/toolkit";


export const Codes = createSlice({
    name:"Codes",
    initialState:[
        {
            name:"ALI.JS",
            percentage:10
        }
    ],
    reducers:{
        addPromoCode: (state, action)=>{
           state.push(
            {
             name:action.payload.name,
             percentage:action.payload.percentage
            }
           );
        },
        removePromoCode: (state, action)=>{
           state = state.filter((item)=> item.percentage != action.payload)    
        }
        
    }
});

export default Codes.reducer;
export const {addPromoCode, removePromoCode} = Codes.actions;

