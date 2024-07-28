import {useSignOut} from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'
import useShowToast from './useShowToast'
import {logout} from '../store/authSlice'
import { useDispatch } from 'react-redux'

const useLogout = () => {
    const dispatch = useDispatch()
    const showToast = useShowToast()
    const [signOut, isLoggingout, error] = useSignOut(auth)
    const handleLogout = async () => {
        try {
            await signOut()
            localStorage.removeItem('insta-user')
            dispatch(logout())
        } catch (error) {
            showToast('error', error.message, 'error')
        }
    }
    return {handleLogout, isLoggingout, error}
}

export default useLogout