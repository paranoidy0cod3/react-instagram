import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status:false,
    userData:JSON.parse(localStorage.getItem('insta-user'))
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload
        },
        logout: (state, action) => {
            state.status = false;
            state.userData = null
        },
        update: (state, action) => {
            state.status = true;
            state.userData = action.payload
        }
    }
})

export const {login, logout, update} = authSlice.actions
export default authSlice.reducer