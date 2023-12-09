import { createSlice } from "@reduxjs/toolkit";


export const EmailSlice =  createSlice({
    name : "email",
    initialState : {
        email : "",
        password : ""
    },
    reducers : {
        email(state,{payload}){
            state.email = payload.email
        },
        pass(state,{payload}){
            state.password = payload.pass
        }
    }
})