import React, { Fragment } from "react";
import { useReactiveVar } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" exact element={isLoggedIn ? <Home /> : <Login />} />
            {!isLoggedIn ? (
              <Route path={routes.signUp} exact element={<SignUp />} />
            ) : null}
          </Routes>
        </Fragment>
        {/* <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
