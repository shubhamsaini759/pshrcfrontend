import { configureStore } from "@reduxjs/toolkit";
import { EmailSlice } from "./EmailSlice";

export const emailActions = EmailSlice.actions ;


const Store = configureStore({
    reducer : {
        EmailReducer : EmailSlice.reducer,
    }  
})


export default Store;