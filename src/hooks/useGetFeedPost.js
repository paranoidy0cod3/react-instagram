import React, {useState, useEffect} from 'react'
import useShowToast from './useShowToast'
import { useDispatch, useSelector } from 'react-redux'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import { createPost } from '../store/postSlice'

const useGetFeedPost = () => {
    const showToast = useShowToast()
    // const userPost = useSelector(state => state.posts.posts)
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const authUser = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()

    useEffect(()=> {
        const getFeedPost = async () => {
            if(authUser.following?.length ===0) {
                setIsLoading(false)
                return;
            }
            const q = query(collection(firestore,"posts"), where("createBy", "in", authUser.following))
            try {
                const querySnapshot = await getDocs(q)
                const feedPosts =[];
    
                querySnapshot.forEach(doc =>feedPosts.push({id:doc.id, ...doc.data()}))
                feedPosts.sort((a, b)=> b.createdAt - a.createdAt)
                setPosts(feedPosts)
                dispatch(createPost(feedPosts))
                
            } catch (error) {
                showToast("Error feed post", error.message, 'error')
            }finally{
                setIsLoading(false)
            }
        }
        if(authUser) getFeedPost()
    }, [authUser, showToast, setPosts, createPost])
    return {isLoading, posts}
}
  


export default useGetFeedPost