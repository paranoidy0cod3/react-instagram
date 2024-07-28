import { useState } from "react";
// import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
// import useUserProfileStore from "../store/userProfileStore";
import { useSelector, useDispatch } from "react-redux";
import {updateUser} from '../store/userSlice'
import {update} from '../store/authSlice'

const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);
    const dispatch = useDispatch()

	const authUser = useSelector((state) => state.auth.userData);
	// const setAuthUser = useSelector((state) => state.user.user);
	// const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

	const showToast = useShowToast();

	const editProfile = async (inputs, selectedFile) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		const storageRef = ref(storage, `profilePics/${authUser.uid}`);
		const userDocRef = doc(firestore, "users", authUser.uid);

		let URL = "";
		try {
			if (selectedFile) {
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
			}

			const updatedUser = {
				...authUser,
				fullName: inputs.fullName || authUser.fullName,
				username: inputs.username || authUser.username,
				bio: inputs.bio || authUser.bio,
				profilePicURL: URL || authUser.profilePicURL,
			};

			await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("insta-user", JSON.stringify(updatedUser));
			dispatch(updateUser(updatedUser))
			dispatch(update(updatedUser))
			showToast("Success", "Profile updated successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { editProfile, isUpdating };
};

export default useEditProfile;