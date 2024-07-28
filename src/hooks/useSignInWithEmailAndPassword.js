import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { doc, getDoc } from "firebase/firestore";
import useShowToast from './useShowToast'
import { auth, firestore} from '../firebase/firebase';
import { login } from '../store/authSlice';
import { getUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';

const useLoginWithEmailAndPassword = () => { 
    const dispatch = useDispatch()   
    const showToast = useShowToast()
    const navigate = useNavigate()
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth)

    const signin = async (inputs) => {
        if(!inputs.email || !inputs.password){
             showToast("Error", "Ener your username & password", 'error')
            return;
        }
        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)
            
            if(userCred){
                const docRef =  doc(firestore,"users", userCred.user.uid)                
                const userData= await getDoc(docRef)
                localStorage.setItem("insta-user", JSON.stringify(userData.data()))
                dispatch(login(userData.data()))
                dispatch(getUser(userData.data()))
                
            }else{
                showToast("Error::authenticaton", 'authentication failed', 'error')
                navigate('/auth')
            }
        
            
        } catch (error) {
            showToast("Login Error::", error.message, 'error')
        }

    }

    return { loading, error, signin}
}

export default useLoginWithEmailAndPassword