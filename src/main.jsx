import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("grey.100", "#000")(props),
      color: mode("grey.800", "whiteAlpha.900")(props),
    },
  }),
};
const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles,
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
