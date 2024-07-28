import { Box, Center, Container, Flex, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { AuthForm } from '../components'

const Auth = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Container maxW={"container.md"} padding={0}>
      <Flex alignItems={"center"} >
          <Box display={{base:"none", md:"block"}} >
            <Image src='/img/homeImage1.png' />
          </Box> 

          <VStack spacing={4} align={"strech"}>
            <AuthForm />
              <Box textAlign={"center"}>Get the App </Box>
                <Flex alignItems={"center"} justify={"center"} gap={5} >
                  <Image src="/img/playstore.png" h={"10"}  alt="plastore logo" />
                  <Image src="/img/microsoft.png" h={"10"} alt="microsoft logo" />
                </Flex>
          </VStack> 
        </Flex>      
      </Container>      
    </Flex>
  )
}

export default Auth