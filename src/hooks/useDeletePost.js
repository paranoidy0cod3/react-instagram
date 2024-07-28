import React, {useState} from 'react'
import { doc, updateDoc, deleteField, deleteDoc, query, collection, where, arrayRemove } from "firebase/firestore";
import {firestore, storage} from '../firebase/firebase'
import { useDispatch, useSelector } from 'react-redux';
import useShowToast from '../hooks/useShowToast'
import { deletePost } from '../store/postSlice';
import { removePost } from '../store/userSlice';
import { deleteObject, ref } from 'firebase/storage';

const useDeletePost = () => {
    const showToast = useShowToast()
    const dispatch = useDispatch()
    const [isDeleting, setIsDeleting] = useState(false)
    const authUser = useSelector(state => state.auth.userData)
    const profileUser = useSelector(state => state.user.user)
    
    const deleteUserPost = async (postId) => {
        console.log(postId)
      if(authUser.id !== profileUser.id) throw new Error("you can not delete this post")
      const confirmation = window.confirm("are you sure, you want to delete the post?")
      if(!confirmation) {
        setIsDeleting(false)
        return;
      }
      else{
        setIsDeleting(true)      
        try {
        
            const imageRef = ref(storage, `posts/${postId}`)
            await deleteObject(imageRef)
            const userRef = doc(firestore, "users", authUser.uid)
            await deleteDoc(doc(firestore, "posts", postId))
            await updateDoc(userRef, 
                {posts:arrayRemove(postId)})
            dispatch(deletePost(postId))
            dispatch(removePost(postId))
           showToast("Post delete::", "Post deleted successfuly", 'success') 
        } catch (error) {
            showToast("Error deleting post::", error.message, 'error')        
        }finally{
            setIsDeleting(false)
        }
    
    }
  }
  return {isDeleting, deleteUserPost}
}

export default useDeletePost