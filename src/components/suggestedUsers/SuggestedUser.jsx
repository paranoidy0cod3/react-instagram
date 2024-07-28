import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Flex, Link, Text, Button } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import { useSelector } from "react-redux";

const SuggestedUser = ({ user }) => {
  const { isLoading, isFollowing, handleFollowUser } = useFollowUser(user?.uid);
  const authUser = useSelector((state) => state.auth.userData);
  return (
    <Flex
      py={2}
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"full"}
    >
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${user.username}`} as={RouterLink}>
          <Avatar size={"sm"} name={user.username} src={user.profilePicURL} />
          <Box>
            <Text fontSize={12} fontWeight={"bold"}>
              {user.fullName}
            </Text>
            <Text fontSize={9} color={"gray.500"}>
              {user.followers.length}
            </Text>
          </Box>
        </Link>
      </Flex>
      {authUser.username !== user.username && (
        <Button
          onClick={handleFollowUser}
          bg={"transparent"}
          _hover={{ bg: "transparent" }}
          isLoading={isLoading}
        >
          <Text
            _hover={{ color: "white" }}
            cursor={"pointer"}
            color={"blue.400"}
            fontSize={12}
            textAlign={"center"}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Text>
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;
