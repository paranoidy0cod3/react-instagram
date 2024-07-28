import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import postSlice from "./postSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        user: userSlice,
        posts: postSlice,
    }
})

export default store