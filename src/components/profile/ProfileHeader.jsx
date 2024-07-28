import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Avatar,
  AvatarGroup,
  Flex,
  VStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";

const ProfileHeader = () => {
  const { username } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user.user);
  const authUser = useSelector((state) => state.auth.userData);
  const visitingOwnProfile = authUser?.username === user?.username;
  const visitingAnotherProfile = authUser?.username !== user.username;

  const {
    isFollowing,
    isLoading: isUpdating,
    handleFollowUser,
  } = useFollowUser(user?.uid);

  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        mx={"auto"}
      >
        <Avatar name="paranoidy0cod3" src={user.profilePicURL} />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          w={"full"}
          justifyContent={{ base: "center", sm: "flex-start" }}
          gap={4}
          direction={{ base: "column", sm: "row" }}
        >
          <Text fontSize={{ base: "sm", md: "lg" }} align={"center"}>
            {user.fullName}
          </Text>

          {visitingOwnProfile && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                onClick={onOpen}
                size={{ base: "xs", md: "sm" }}
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
              >
                Edit Profile
              </Button>
            </Flex>
          )}

          {visitingAnotherProfile && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                size={{ base: "xs", md: "sm" }}
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "whiteAlpha.800", color: "black" }}
                isLoading={isUpdating}
                onClick={handleFollowUser}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Flex>
          )}
          {/* ------------------------ Edit user profile Modal ---------------------- */}
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", sm: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {user.posts.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", sm: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {user.followers.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", sm: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {user.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={{ base: "xs", sm: "sm" }} fontWeight={"bold"}>
            {user.username}
          </Text>
        </Flex>
        <Text fontSize={{ base: "xs", sm: "sm" }}>{user.bio}</Text>
      </VStack>
      {isOpen && <EditProfile onClose={onClose} isOpen={isOpen} />}
    </Flex>
  );
};

export default ProfileHeader;
