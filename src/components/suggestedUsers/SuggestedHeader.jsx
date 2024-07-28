import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Avatar, Flex, Link, Text, Button } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import { useSelector } from "react-redux";

const SuggestedHeader = () => {
  const user = useSelector((state) => state.auth.userData);
  if (!user) return null;

  const { handleLogout, isLoggingout } = useLogout();
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Link
        _hover={{ textDecor: "none" }}
        textDecor={"none"}
        to={`/${user.username}`}
        as={RouterLink}
      >
        <Flex alignItems={"center"} gap={2}>
          <Avatar size={"sm"} src={user.profilePicURL} />
          <Text>{user.fullName}</Text>
        </Flex>
      </Link>
      <Flex>
        <Button
          onClick={handleLogout}
          bg={"transparent"}
          _hover={{ bg: "transparent" }}
          fontSize={14}
          color={"blue.400"}
          cursor={"pointer"}
          textDecoration={"none"}
          size={"sm"}
          fontWeight={"bold"}
        >
          Log out
        </Button>
      </Flex>
    </Flex>
  );
};

export default SuggestedHeader;
