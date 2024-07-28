import React, {useState} from 'react'
import useShowToast from './useShowToast'
import { useDispatch, useSelector } from 'react-redux'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import { addComment } from '../store/postSlice'

const useCreateComment = () => {
    const showToast = useShowToast()
    const [isCommenting, setIsCommenting] = useState(false)
    const authUser = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()
    
    const createComment = async (comment, postId) => {
        setIsCommenting(true)
        if(isCommenting) return;
        const newComment = {
            comment,
            createdBy:authUser.uid,
            createdAt:Date.now(),
            postId
        }
        try {
            await updateDoc(doc(firestore,"posts",postId), {
                comments: arrayUnion(newComment)
            })
            dispatch(addComment(newComment))
        } catch (error) {
            showToast("Comment Error::", error.message, 'error')
        }finally{
            setIsCommenting(false)
        }
    }
    return {isCommenting, createComment}
}

export default useCreateComment