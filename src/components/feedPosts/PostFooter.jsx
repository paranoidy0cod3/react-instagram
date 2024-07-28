import React, { useRef, useState } from "react";
import {
  Flex,
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constant";
import useCreateComment from "../../hooks/useCreateComment";
import { useSelector } from "react-redux";
import useLikesCount from "../../hooks/useLikesCount";

function PostFooter({ post, userProfile, isProfilePage = true }) {
  const authUser = useSelector((state) => state.auth.status);
  const [comment, setComment] = useState("");
  // const [liked, setLiked] = useState(false);
  // const [likesCount, setLikesCount] = useState(0);
  const { isComenting, createComment } = useCreateComment();
  const focusRef = useRef(null);
  const { isUpdating, likeCount, liked, setLike } = useLikesCount(post);
  const handleLike = () => {
    setLike();
  };
  const handleCreateComment = () => {
    createComment(comment, post.id);
    setComment("");
  };

  return (
    <>
      <Box marginTop={"auto"}>
        <Flex
          alignItems={"center"}
          gap={4}
          w={"full"}
          pt={0}
          mb={"auto"}
          mt={"2"}
        >
          <Box onClick={handleLike} fontSize={18} cursor={"pointer"}>
            {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
          </Box>
          <Button
            onClick={() => focusRef.current?.focus()}
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
          >
            <CommentLogo />
          </Button>
        </Flex>
        <Text>
          {likeCount} {likeCount <= 1 ? "Like" : "Likes"}
        </Text>
        {isProfilePage && (
          <>
            <Text fontSize={"sm"} fontWeight={700}>
              {userProfile?.username}
              {" - "}
              <Text as={"span"} fontStyle={"italic"} fontWeight={400}>
                {post?.caption}
              </Text>
            </Text>
            {userProfile?.comments.length > 0 && (
              <Text fontSize={"sm"} color={"gray"}>
                {userProfile?.comments.length}
              </Text>
            )}
          </>
        )}
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          {authUser && (
            <InputGroup>
              <Input
                onChange={(e) => setComment(e.target.value)}
                variant={"flushed"}
                fontSize={14}
                placeholder="Add a comment..."
                value={comment}
                ref={focusRef}
              />
              <InputRightElement>
                <Button
                  onClick={handleCreateComment}
                  isLoading={isComenting}
                  fontSize={14}
                  color={"blue.500"}
                  fontWeight={600}
                  cursor={"pointer"}
                  _hover={{ color: "white" }}
                  bg={"transparent"}
                >
                  Post
                </Button>
              </InputRightElement>
            </InputGroup>
          )}
        </Flex>
      </Box>
    </>
  );
}

export default PostFooter;
