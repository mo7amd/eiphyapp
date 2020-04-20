import React, { useState } from 'react';
import { FacebookLoginButton } from 'react-social-login-buttons';
import PropTypes from 'prop-types';
import firebase from '../lib/firebase';

const Login = ({ onLogin }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <FacebookLoginButton
      text="Facebook"
      disabled={disabled}
      onClick={() => {
        setDisabled(true);
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const { user } = result;
          // ...
          onLogin(user);
          setDisabled(false);
        }).catch((error) => {
          setDisabled(false);

          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const { email } = error;
          // The firebase.auth.AuthCredential type that was used.
          const { credential } = error;
        // ...
        });
      }}
    />
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
export default Login;
