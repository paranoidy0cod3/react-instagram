import React from "react";
import { Tooltip, Link, Box } from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/constant";

const Notification = () => {
  return (
    <>
      <Tooltip
        hasArrow
        label={"Notification"}
        placement="right"
        ml={1}
        openDelay={300}
        display={{ base: "block", md: "none" }}
      >
        <Link
          //   as={RouterLink}
          display={"flex"}
          //   to={"/"}
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
        >
          <NotificationsLogo />
          <Box display={{ base: "none", md: "block" }}>Notification</Box>
        </Link>
      </Tooltip>
    </>
  );
};

export default Notification;
