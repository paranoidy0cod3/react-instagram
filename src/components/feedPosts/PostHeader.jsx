import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Link,
  SkeletonCircle,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { timeAgo } from "../../utils/timeAgo";
import { Link as RouterLink } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";

const PostHeader = ({ user, post }) => {
  const { isLoading, isFollowing, handleFollowUser } = useFollowUser(
    post.createBy
  );
  return (
    <Flex
      mb={2}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
    >
      <Flex alignItems={"center"} gap={2}>
        {!user ? (
          <SkeletonCircle />
        ) : (
          <Link as={RouterLink} to={`/${user.username}`}>
            <Avatar
              src={user?.profilePicURL}
              size={"sm"}
              alt="user profile pic"
            />
          </Link>
        )}

        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          {!user ? (
            <Skeleton h={"10px"} />
          ) : (
            <Link as={RouterLink} to={`/${user.username}`}>
              {user?.fullName}
            </Link>
          )}
          <Box>{timeAgo(post?.createdAt)}</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          onClick={handleFollowUser}
          isLoading={isLoading}
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{ bg: "transparent" }}
          transition={"0.2s ease-in-out"}
          bg={"transparent"}
          size={"sm"}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
