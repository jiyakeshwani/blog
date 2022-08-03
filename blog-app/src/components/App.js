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
import Register from "./Register";
import SingleArticle from "./SingleArticle";

class App extends React.Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default App;
