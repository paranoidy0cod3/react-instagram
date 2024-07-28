import React from "react";
import { useLocation } from "react-router-dom";
import { Sidebar, Navbar } from "../components";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";
  const userIsLoading = !user && loading;

  if (userIsLoading) return <PageLayoutSpinner />;
  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}
      {/* ------------------Navbar------------ */}
      {canRenderNavbar ? <Navbar /> : null}
      <Box
        flex={1}
        w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Spinner size={"xl"} />
    </Flex>
  );
};
