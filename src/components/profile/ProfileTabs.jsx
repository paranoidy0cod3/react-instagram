import React from 'react'
import { IoMdGrid } from "react-icons/io";
import { BsSuitHeart } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { Box, Flex, Text} from '@chakra-ui/react'

const ProfileTabs = () => {
  return (
    <Flex
    w={"full"}
    justifyContent={"center"}
    gap={{base:4, sm:10}}
    textTransform={"uppercase"}
    fontWeight={"bold"}
    >
      <Flex borderTop={"1px solid white"} alignItems={"center"} p={3} gap={1} cursor={"pointer"} >
        <Box fontSize={20}>
          <IoMdGrid />
        </Box>
        <Text fontSize={12} display={{base:"none", sm:"block"}}>Posts</Text>
      </Flex>
      <Flex  alignItems={"center"} p={3} gap={1} cursor={"pointer"} >
        <Box fontSize={20}>
          <BsBookmark />
        </Box>
        <Text fontSize={12} display={{base:"none", sm:"block"}}>Saved</Text>
      </Flex>
      <Flex  alignItems={"center"} p={3} gap={1} cursor={"pointer"} >
        <Box fontSize={20}>
          <BsSuitHeart />
        </Box>
        <Text fontSize={12} display={{base:"none", sm:"block"}}>Likes</Text>
      </Flex>
      
      
    </Flex>
  )
}

export default ProfileTabs