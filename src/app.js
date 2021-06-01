import React from 'react';
import Header from './header';
import IsLoadingAndError from './IsLoadingAndError';
import MyFavoriteBooks from './myFavoriteBooks';
import Footer from './footer';
import { withAuth0 } from '@auth0/auth0-react';
import Login from './login';
import Profile from './Profile';
import Button from 'react-bootstrap/Button';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    console.log('app', this.props)
    return (
      <>
        <Router>

          {/* <IsLoadingAndError> */}

          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
              {this.props.auth0.isAuthenticated ? <MyFavoriteBooks /> : <Login />}

            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route path="/profile">

              <Profile />

            </Route>


          </Switch>
          <Footer />

          {/* </IsLoadingAndError> */}

        </Router>
      </>
    )
  }
}

export default withAuth0(App);
