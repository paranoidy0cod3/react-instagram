import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { Box, Image } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createBy);
  // console.log(userProfile);
  return (
    <Box mb={10}>
      <PostHeader user={userProfile} post={post} />
      <Box borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} />
      </Box>
      <PostFooter post={post} userProfile={userProfile} />
    </Box>
  );
};

export default FeedPost;
