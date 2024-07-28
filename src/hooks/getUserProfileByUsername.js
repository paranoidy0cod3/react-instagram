import React, {useState, useEffect} from "react";
import useShowToast from "./useShowToast";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase"; 
import {getUser} from '../store/userSlice'
import { useDispatch, useSelector } from "react-redux";

const getUserProfileByUsername = (username) => {
    const showToast = useShowToast()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    
    
  useEffect(()=>{
    const getUserProfile = async () => {
      setIsLoading(true)
      try {
        const q = query(collection(firestore, "users"), where("username", "==", username))
        const querySnapshot = await (getDocs(q))
          if(querySnapshot.empty){
            dispatch(getUser(null))
            showToast("Error profile::", 'user does not exists', "error")
          }
          else {
            let userDoc;
            querySnapshot.forEach(doc => userDoc=doc.data())
            dispatch(getUser(userDoc))
            
          }
      } catch (error) {
        showToast("Error:: getting Profile::",error.message, "error")
      }finally{
        setIsLoading(false)
        
      }
    }
    getUserProfile()

  }, [showToast, username, getUser])

  return {isLoading}
 }

export default getUserProfileByUsername