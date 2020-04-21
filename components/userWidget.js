import React, { Component } from 'react';
import Login from './login';
import firebase from '../lib/firebase';
import Logout from './logout';

class UserWidget extends Component {
  constructor(props) {
    super(props);

    this.state = { user: null };

    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    if (!user) {
      return (
        <Login />
      );
    }

    return (
      <Logout />
    );
  }
}

UserWidget.propTypes = {};

export default UserWidget;
