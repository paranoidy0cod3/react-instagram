import React from "react";
import { ProfileHeader, ProfilePosts, ProfileTabs } from "../components";
import {
  Container,
  Flex,
  Skeleton,
  VStack,
  SkeletonCircle,
  Link,
  Text,
} from "@chakra-ui/react";
import getUserProfileByUsername from "../hooks/getUserProfileByUsername";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const userProfile = useSelector((state) => state.user.user);
  const showToast = useShowToast();
  const { username } = useParams();

  const { isLoading } = getUserProfileByUsername(username);

  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;

  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        flexDir={"column"}
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
      >
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default Profile;

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size="24" />

      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};

const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        Go home
      </Link>
    </Flex>
  );
};
