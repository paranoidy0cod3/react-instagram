import React, {useState} from 'react'
import useShowToast from './useShowToast'
import { useSelector } from 'react-redux'
import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useLikesCount = (post) => {
    const showToast = useShowToast()
    const authUser = useSelector(state => state.auth.userData)
    const [liked, setLiked] =useState(post?.likes.includes(authUser?.uid))
    const [likeCount, setLikeCount] = useState(post?.likes.length)
    const [isUpdating, setIsUpdating] = useState(false)

    const setLike = async () => {
        if(isUpdating) return;
        if(!authUser) return showToast("Error", "you should login for like")
        setIsUpdating(true)
        try {
            const docRef = doc(firestore,"posts", post.id)
           const likeDoc= await updateDoc(docRef, {
                likes: liked? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })
            setLiked(!liked)
            liked ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
        } catch (error) {
            showToast("Error likes", error.message, 'error')
        }finally{
            setIsUpdating(false)
        }

    }

    return {setLike, likeCount, isUpdating, liked}
  
}

export default useLikesCount