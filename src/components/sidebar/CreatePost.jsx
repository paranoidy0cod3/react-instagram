import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import usePreviewImg from "../../hooks/usePreviewImg";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, uploadString, ref } from "firebase/storage";
import { CreatePostLogo } from "../../assets/constant";
import { BsFillImageFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/postSlice";
import useShowToast from "../../hooks/useShowToast";
import { addPost } from "../../store/userSlice";

const CreatePost = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const showToast = useShowToast();
  const imageRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePost = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Error while handling createPost", error.message, "error");
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create Post"}
        placement="right"
        ml={1}
        openDelay={300}
        display={{ base: "block", md: "none" }}
      >
        <Box
          onClick={onOpen}
          display={"flex"}
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Box>
      </Tooltip>
      {
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />

          <ModalContent bg={"black"} border={"1px solid gray"}>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Textarea
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Post caption..."
              />

              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <BsFillImageFill
                onClick={() => imageRef.current.click()}
                style={{
                  marginTop: "15px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                size={16}
              />
              <Flex justifyContent={"center"} alignItems={"center"}>
                <Image src={selectedFile} />
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button onClick={handlePost} isLoading={isLoading} mr={3}>
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useSelector((state) => state.auth.userData);
  const userProfile = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("please select an image");
    setIsLoading(true);
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile.uid === authUser.uid)
        dispatch(createPost({ ...newPost, id: postDocRef.id }));
      if (pathname !== "/" && userProfile.uid === authUser.uid)
        dispatch(addPost({ ...newPost, id: postDocRef.id }));

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error:: creating post", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, handleCreatePost };
}
