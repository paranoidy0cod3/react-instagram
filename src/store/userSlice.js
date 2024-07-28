import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    status:false,   
    user:JSON.parse(localStorage.getItem('insta-user'))
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        getUser:(state, action) => {
            state.status=true;
            state.user = action.payload
        },
        updateUser: (state, action) => {
            state.status =true;
            state.user = action.payload
        },
        addPost: (state, action) => {
            state.user.posts = state.user.posts.push(action.payload)
        },
        removePost: (state, action) => {
            state.user.posts = state.user.posts.filter(id => id !== action.payload)
        }

    }
})

export const {getUser, updateUser, addPost, removePost} = userSlice.actions
export default userSlice.reducer