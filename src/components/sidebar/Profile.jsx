import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Tooltip, Link, Box, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Profile = () => {
  const authUser = useSelector((state) => state.auth.userData);

  return (
    <>
      <Tooltip
        hasArrow
        label={"Profile"}
        placement="right"
        ml={1}
        openDelay={300}
        display={{ base: "block", md: "none" }}
      >
        <Link
          as={RouterLink}
          display={"flex"}
          to={`/${authUser?.username}`}
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
        >
          <Avatar size={"sm"} src={authUser?.profilePicURL} />
          <Box display={{ base: "none", md: "block" }}>
            {authUser?.fullName}
          </Box>
        </Link>
      </Tooltip>
    </>
  );
};

export default Profile;
