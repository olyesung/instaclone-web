import React, { Fragment } from "react";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Fragment>
              <Routes>
                <Route
                  path={routes.home}
                  exact
                  element={isLoggedIn ? <Home /> : <Login />}
                />
                {!isLoggedIn ? (
                  <Route path={routes.signUp} exact element={<SignUp />} />
                ) : null}
              </Routes>
            </Fragment>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
