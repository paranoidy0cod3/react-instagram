import React from "react";
import { Tooltip, Link, Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const Home = () => {
  return (
    <>
      <Tooltip
        hasArrow
        label={"Home"}
        placement="right"
        ml={1}
        openDelay={300}
        display={{ base: "block", md: "none" }}
      >
        <Link
          as={RouterLink}
          display={"flex"}
          to={"/"}
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
        >
          <AiFillHome size={25} />
          <Box display={{ base: "none", md: "block" }}>Home</Box>
        </Link>
      </Tooltip>
    </>
  );
};

export default Home;
