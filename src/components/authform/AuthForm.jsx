import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  Button,
  Image,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import GoogleAuth from "./GoogleAuth";
import Login from "./Login";
import Signup from "./Signup";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid grey"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="img/logo.png" alt="intagram logo" />
          {isLogin ? <Login /> : <Signup />}

          {/* ------------------ OR --------------------------------- */}
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"full"}
            my={4}
            gap={1}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} /> <Text> OR </Text>{" "}
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          {/* ----------------------- Google Login ------------------------ */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
          >
            <GoogleAuth prefix={isLogin} />
          </Flex>
        </VStack>
      </Box>

      <Box border={"1px solid grey"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an Account?" : "Already have an Account?"}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            cursor={"pointer"}
            color={"blue.500"}
          >
            {isLogin ? "Sign up" : "Log In"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
