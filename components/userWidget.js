import React, { Component } from 'react';
import Login from './login';
import firebase from '../lib/firebase';

class UserWidget extends Component {
  constructor(props) {
    super(props);

    this.state = { user: firebase.auth().currentUser };
  }

  onLogin = (user) => {
    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    if (!user) {
      return (
        <Login onLogin={this.onLogin} />

      );
    }

    return (
      <div>user</div>
    );
  }
}

UserWidget.propTypes = {};

export default UserWidget;
