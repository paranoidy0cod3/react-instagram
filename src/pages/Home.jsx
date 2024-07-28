import { Container, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { FeedPosts, SuggestedUsers } from "../components";

const Home = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={3} py={10}>
          <FeedPosts />
        </Box>
        <Box flex={2} py={10} mr={20} display={{ base: "none", md: "block" }}>
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
