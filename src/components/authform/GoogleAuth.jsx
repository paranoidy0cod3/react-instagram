import React from "react";
import { Image, Text, Button } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { firestore, auth } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import useShowToast from "../../hooks/useShowToast";
const GoogleAuth = ({ prefix }) => {
  const showToast = useShowToast();
  const dispatch = useDispatch();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const signinGoogle = async () => {
    try {
      const userCre = await signInWithGoogle();
      if (!userCre) {
        showToast("Error", error.message, "error");
        return;
      }
      const userRef = doc(firestore, "users", userCre.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // if user exists let user login
        const userDoc = userSnap.data();
        dispatch(login(userDoc));
      } else {
        const userDoc = {
          uid: userCre.user.uid,
          email: userCre.user.email,
          username: userCre.user.email.split("@")[0],
          fullName: userCre.user.displayName,
          bio: "",
          profilePicURL: userCre.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", userCre.user.uid), userDoc);
        localStorage.setItem("insta-user", JSON.stringify(userDoc));
        dispatch(login(userDoc));
      }
    } catch (error) {
      showToast("Error :: googleAuth::", error.message, "error");
    }
  };
  return (
    <>
      <Image src="/img/google.png" w={5} alt="google Logo" />
      <Button
        onClick={signinGoogle}
        bg={"transparent"}
        _hover={{ bg: "transparent" }}
        mx={2}
        color={"blue.500"}
      >
        {prefix ? "Log In" : "Sign up"} with Google
      </Button>
    </>
  );
};

export default GoogleAuth;
