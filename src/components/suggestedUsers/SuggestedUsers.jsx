import { Flex, VStack, Text, Box } from "@chakra-ui/react";
import React from "react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  return (
    <VStack>
      <SuggestedHeader />

      {suggestedUsers.length !== 0 && (
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          w={"full"}
          py={4}
        >
          {" "}
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            _hover={{ color: "gray.400" }}
            cursor={"pointer"}
          >
            See All
          </Text>
        </Flex>
      )}
      {suggestedUsers?.map((user) => (
        <SuggestedUser key={user.uid} user={user} />
      ))}
      <Box alignSelf={"flex-start"} color={"gray.500"} fontSize={12}>
        &copy; 2024 Paranoidy0cod3
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
