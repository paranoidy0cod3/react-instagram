import React, {useState} from 'react'
import useShowToast from '../hooks/useShowToast'
import { collection, query, where, getDocs } from "firebase/firestore";
import {firestore} from '../firebase/firebase'

const useSearchUser = () => {
  const showToast = useShowToast()
  const [isLoading, setIsLoading] = useState(false)
  const [foundUser, setFoundUser] = useState(null)

    const searchUser = async (username) => {
        if(!username) return;
        setIsLoading(true)
      try {
        const q = query(collection(firestore, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        
        if(querySnapshot.empty){
            showToast("Error find user::", "user not found", "error")
            
        }else{
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setFoundUser(doc.data())
                });
            setIsLoading(false)
        }
        
        } catch (error) {
            showToast("Error query user", error.message, "error")

        }finally {
            setIsLoading(false)
        }

    }
    return {searchUser, isLoading, foundUser, setFoundUser}
}

export default useSearchUser