import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { callback } = this.props;

    if (!user) {
      return (
        <Login callback={callback} />
      );
    }

    return (
      <Logout callback={callback} />
    );
  }
}

UserWidget.defaultProps = {
  callback: () => {},
};
UserWidget.propTypes = {
  callback: PropTypes.func,
};

export default UserWidget;
