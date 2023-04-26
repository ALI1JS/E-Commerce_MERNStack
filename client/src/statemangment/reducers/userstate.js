import {createSlice} from "@reduxjs/toolkit";
import avatar from "../../assets/login-animation.gif";

export const userData = createSlice({
    name:"userData",
    initialState:{
        firstName:"my client",
        avatar:avatar,
        isAuth:false
    },
    reducers:{
         addInfo : (state,action)=>{
            state.firstName = action.payload.firstName;
            state.avatar = action.payload.avatar;
            state.isAuth = action.payload.isAuth;
         },
         removeInfo: (state,action)=>{
            state.firstName = "";
            state.avatar = "";
         },
        updateInfo : (state,action)=>{
           state.firstName = action.payload.firstName;
           state.avatar = action.payload.avatar;
        }
    }
});

export const { addInfo,removeInfo,updateInfo } = userData.actions;
export default userData.reducer;