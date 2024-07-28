import { Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constant";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  const { handleLogout, isLoggingout, error } = useLogout();

  return (
    <Box
      h={"100vh"}
      borderRight={"1px solid"}
      borderColor={"white.alpha.300"}
      py={8}
      px={{ base: 2, md: 4 }}
      position={"sticky"}
      top={0}
      left={0}
    >
      <Flex direction={"column"} gap={10} width={"full"} height={"full"}>
        <Link
          to="/"
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstagramLogo />
        </Link>
        <Link
          to="/"
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.200" }}
          w={10}
          cursor={"pointer"}
        >
          <InstagramMobileLogo />
        </Link>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>
        <Tooltip
          hasArrow
          label="Logout"
          placement="right"
          ml={1}
          openDelay={300}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={handleLogout}
            mt={"auto"}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
          >
            <BiLogOut />
            <Button
              color={"white"}
              _hover={{ bg: "transparent" }}
              variant={"ghost"}
              display={{ base: "none", md: "block" }}
              isLoading={isLoggingout}
            >
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
