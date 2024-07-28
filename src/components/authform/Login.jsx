import React, { useState } from "react";
import { Input, Button, Alert, AlertIcon } from "@chakra-ui/react";

import useLoginWithEmailAndPassword from "../../hooks/useSignInWithEmailAndPassword";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const { loading, error, signin } = useLoginWithEmailAndPassword();

  return (
    <>
      <Input
        onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
        type="email"
        placeholder="Email"
      />

      <Input
        onChange={(e) =>
          setUserInput({ ...userInput, password: e.target.value })
        }
        type="password"
        placeholder="Password"
        value={userInput.password}
      />

      {error && (
        <Alert
          status="error"
          color={"black"}
          fontSize={12}
          p={2}
          borderRadius={4}
        >
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button
        onClick={() => signin(userInput)}
        type="button"
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        isLoading={loading}
      >
        Log In
      </Button>
    </>
  );
};
export default React.forwardRef(Login);
