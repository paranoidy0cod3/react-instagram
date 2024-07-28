import React, { useState, useEffect } from "react";
import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import { useSelector } from "react-redux";
import useFetchPosts from "../../hooks/useFetchPosts";
const ProfilePosts = () => {
  const { isLoading, posts } = useFetchPosts();

  return (
    <Grid gap={1} templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }}>
      {isLoading &&
        [0, 1, 2, 3, 4, 5].map((_, index) => (
          <VStack alignItems={"flex-start"} gap={4} key={index}>
            <Skeleton w={"full"}>
              <Box h={"300px"}></Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading &&
        posts &&
        posts.map((post) => <ProfilePost key={post.id} post={post} />)}
    </Grid>
  );
};

export default ProfilePosts;
