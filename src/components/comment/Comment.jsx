import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Avatar,
  Text,
  SkeletonCircle,
  Skeleton,
  Link,
} from "@chakra-ui/react";
import { timeAgo } from "../../utils/timeAgo";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const Comment = ({ comment }) => {
  const { isLoading, userProfile } = useGetUserProfileById(comment.createdBy);
  if (isLoading) return <CommentSkeleton />;
  return (
    <Flex gap={4}>
      <Link as={RouterLink} to={`/${userProfile.username}`} cursor={"pointer"}>
        <Avatar src={userProfile?.profilePicURL} size={"sm"} />
      </Link>
      <Flex flexDir={"column"}>
        <Flex gap={4}>
          <Text fontWeight={"bold"} fontSize={12}>
            {userProfile?.username}
          </Text>
          <Text fontSize={14}>{comment.comment}</Text>
        </Flex>
        <Text fontSize={12} color={"gray.400"}>
          {timeAgo(comment.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w="10" />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};
