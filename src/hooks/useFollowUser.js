import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useShowToast from './useShowToast'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import {update} from '../store/authSlice'
import { updateUser } from '../store/userSlice'

const useFollowUser = (userId) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const authUser = useSelector(state => state.auth.userData)
  const profileUser = useSelector(state => state.user.user)
  const showToast = useShowToast()
  const dispatch = useDispatch()

  const handleFollowUser = async () => {
    try {
        const currentUserRef = doc(firestore, "users", authUser.uid)
        const userToFollowUnfollowRef = doc(firestore, "users", userId)

        await updateDoc(currentUserRef, {
            following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
        })
        await updateDoc(userToFollowUnfollowRef, {
            followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
        })

        if(isFollowing) {
            dispatch(update({
                ...authUser,
                following: authUser.following.filter(uid => uid !== userId)
            }))
            if(profileUser)
            dispatch(updateUser({
                ...profileUser,
                followers: profileUser.followers.filter(uid => uid !== authUser.uid)
            }))
    
            localStorage.setItem("insta-user", JSON.stringify({
                ...authUser,
                following: authUser.following.filter(uid => uid !== userId)
            }))
            setIsFollowing(false)
        }else{
            dispatch(update({
                ...authUser,
                following: [...authUser.following, userId]
            }))

            if(profileUser)
            dispatch(updateUser({
                ...profileUser,
                followers: [...profileUser.followers, authUser.uid]
            }))

            localStorage.setItem('insta-user', JSON.stringify({
                ...authUser,
                following: [...authUser.following, userId]
            }))
            setIsFollowing(true)
        }
    } catch (error) {
        showToast("Error Following user::", error.message, "error")
    }
  }


  useEffect(()=>{
    //checking whether user is a followers
    if(authUser) {
        const following = authUser.following.includes(userId)
        setIsFollowing(following)
    }
  }, [authUser, userId])

  return {isLoading, isFollowing, handleFollowUser}
}

export default useFollowUser