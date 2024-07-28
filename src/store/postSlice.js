import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts:[]
}

const postSlice = createSlice({
    name:'Posts',
    initialState,
    reducers: {
        createPost: (state, action) =>{
            state.posts= action.payload
        },
        //TODO UPDATE POST
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload)
        },
        addComment: (state, action) => {
            state.posts.map(post => post.comments.unshift(action.payload))
        }
    }
})

export const {createPost, deletePost, addComment} = postSlice.actions

export default postSlice.reducer