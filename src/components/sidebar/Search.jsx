import React, { useRef } from "react";
import { SearchLogo } from "../../assets/constant";
import {
  Tooltip,
  Link,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  Flex,
} from "@chakra-ui/react";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../suggestedUsers/SuggestedUser";

const Search = () => {
  const searchInputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { searchUser, isLoading, foundUser } = useSearchUser();
  const handleSubmit = (e) => {
    e.preventDefault();
    searchUser(searchInputRef.current.value);
  };
  console.log();
  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
        placement="right"
        ml={1}
        openDelay={300}
        display={{ base: "block", md: "none" }}
      >
        <Link
          display={"flex"}
          //   to={"/"}
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
          {/* <Button onClick={onOpen}>Open Modal</Button> */}

          <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
            <ModalOverlay />
            <ModalContent bg={"black"}>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <form onSubmit={handleSubmit}>
                    <Flex justifyContent={"center"} gap={4} mt={12}>
                      <Input size={"sm"} type="text" ref={searchInputRef} />
                      <Button isLoading={isLoading} type="submit" size={"sm"}>
                        Search
                      </Button>
                    </Flex>
                  </form>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                {!isLoading && foundUser && <SuggestedUser user={foundUser} />}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Link>
      </Tooltip>
    </>
  );
};

export default Search;
