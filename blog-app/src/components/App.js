import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Nomatch from "./Nomatch";
import Register from "./Register";
import SingleArticle from "./SingleArticle";
import FullPageSpinner from "./FullPageSpinner";
import NewPost from "./NewPost";
import Settings from "./Settings";
import Profile from "./Profile";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoggedIn: false,
      user: null,
      isVerifying: true,
    };
  }

  componentDidMount() {
    if (localStorage["user"]) {
      fetch(`https://mighty-oasis-08080.herokuapp.com/api/user`, {
        method: "GET",
        headers: {
          authorization: `Token ${localStorage["user"]}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  }

  updateUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user,
      isVerifying: false,
    });
    localStorage.setItem("user", user.token);
  };
  render() {
    if (this.state.isVerifying) {
      return <FullPageSpinner />;
    }
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp />
        ) : (
          <UnauthenticatedApp updateUser={this.updateUser} />
        )}
      </>
    );
  }
}

function AuthenticatedApp() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/articles/:slug" component={SingleArticle}></Route>

      <Route path="/new-post">
        <NewPost />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="*">
        <Nomatch />
      </Route>
    </Switch>
  );
}

function UnauthenticatedApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login" exact>
        <Login updateUser={props.updateUser} />
      </Route>
      <Route path="/register" exact>
        <Register updateUser={props.updateUser} />
      </Route>
      <Route path="/articles/:slug" component={SingleArticle}></Route>
      <Route path="*">
        <Nomatch />
      </Route>
    </Switch>
  );
}

export default App;
