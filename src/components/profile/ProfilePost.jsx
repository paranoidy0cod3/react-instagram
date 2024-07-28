import React from "react";
import {
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Text,
  useDisclosure,
  Box,
  Avatar,
  Divider,
  VStack,
  Button,
} from "@chakra-ui/react";
import Comment from "../comment/Comment";
import PostFooter from "../feedPosts/PostFooter";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useDeletePost from "../../hooks/useDeletePost";
import { useSelector } from "react-redux";
import { Caption } from "../comment/Caption";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useSelector((state) => state.user.user);
  const { isDeleting, deleteUserPost } = useDeletePost();
  const handleDelete = () => {
    deleteUserPost(post.id);
    onClose();
  };

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          inset={0}
          bg={"blackAlpha.700"}
          transition={"all 0.2s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} gap={50} justifyContent={"center"}>
            <Flex>
              <AiFillHeart size={20} />
              <Text>{post.likes.length}</Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text>{post.comments.length}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          alt="profile picture"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalContent>
          {/* <ModalHeader>Modal title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              mx={"auto"}
              w={{ base: "90%", sm: "70%", md: "full" }}
            >
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
              >
                <Image src={post.imageURL} alt="profile picture" />
              </Box>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex gap={4} alignItems={"center"}>
                    <Avatar src={userProfile.profilePicURL} size={"sm"} />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  <Button
                    isLoading={isDeleting}
                    onClick={handleDelete}
                    borderRadius={4}
                    p={1}
                    bg={"transparent"}
                    color={"white"}
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                  >
                    <MdDelete size={20} cursor={"pointer"} />
                  </Button>
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {/* -----------------Caption---------------- */}
                  {post.caption && <Caption post={post} />}
                  {/* -----------------comments---------------- */}
                  {post.comments?.map((comment) => (
                    <Comment key={comment.createdAt} comment={comment} />
                  ))}
                </VStack>
                <Divider my={4} bg={"gray.800"} />
                <PostFooter isProfilePage={false} post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
