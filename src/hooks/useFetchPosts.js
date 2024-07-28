import React, {useState, useEffect} from 'react'
import useShowToast from '../hooks/useShowToast'
import {firestore} from '../firebase/firebase'
import { where, query, collection, getDocs } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import {createPost} from '../store/postSlice'
const useFetchPosts = () => {
  const showToast = useShowToast()
  const [isLoading, setIsLoading] = useState(true)
  // const [posts, setPosts] = useState([])
  const profileUser = useSelector(state => state.user.user)
  const posts = useSelector(state => state.posts.posts)
  const dispatch = useDispatch()
  

  useEffect(()=>{
    const fetchPosts = async () => {
        if(!profileUser) return;
        setIsLoading(true)
        

        const q =  query(collection(firestore,"posts"),where("createBy","==",profileUser.uid));
        try {
            const querySnapshot = await getDocs(q);

            const post =[];
            querySnapshot.forEach(doc =>  post.push({...doc.data(), id:doc.id}));

            post.sort((a, b)=> b.createdAt - a.createdAt);
            dispatch(createPost(post))
            
        } catch (error) {            
            showToast("Error fetchPost ::", error.message, 'error')
            
        }finally {
            setIsLoading(false)
        }
    }
    fetchPosts()
  }, [showToast])
  return {isLoading, posts}
}

export default useFetchPosts