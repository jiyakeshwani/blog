import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Nomatch from "./Nomatch";
import Register from "./Register";
import SingleArticle from "./SingleArticle";

class App extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/articles/:slug" component={SingleArticle}></Route>
          <Route path="*" exact>
            <Nomatch />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
