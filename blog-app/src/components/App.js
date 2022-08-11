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
  constructor(props) {
    super();
    this.state = {
      isLoggedIn: false,
      user: null,
    };
  }

  updateUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user,
    });
  };
  render() {
    return (
      <>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login updateUser={this.updateUser} />
          </Route>
          <Route path="/register" exact>
            <Register updateUser={this.updateUser} />
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
