import React, { useState, useEffect } from "react";
import FeedPost from "./FeedPost";
import {
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import useGetFeedPost from "../../hooks/useGetFeedPost";

const FeedPosts = () => {
  const { posts, isLoading } = useGetFeedPost();

  const [user, error] = useAuthState(auth);
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [1, 2, 3, 4].map((_, index) => (
          <VStack key={index} alignItems={"flex-start"} mb={10}>
            <Flex gap={2} alignItems={"center"}>
              <SkeletonCircle size={10} />
              <Skeleton height={"10px"} width={"200px"} />
            </Flex>
            <Skeleton w={"full"} height={"500px"} />
          </VStack>
        ))}

      {!isLoading &&
        posts.length > 0 &&
        posts?.map((post) => <FeedPost key={post.id} post={post} />)}

      {!isLoading && posts.length === 0 && (
        <Text>You have no followings, Signup and start making Friends.</Text>
      )}
    </Container>
  );
};

export default FeedPosts;
