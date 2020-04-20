import React, { useState } from 'react';
import { FacebookLoginButton } from 'react-social-login-buttons';
import firebase from '../lib/firebase';

const Login = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <FacebookLoginButton
      text="Facebook"
      disabled={disabled}
      onClick={() => {
        setDisabled(true);
        const provider = new firebase.auth.FacebookAuthProvider();
        console.log(provider);
        firebase.auth().signInWithPopup(provider).catch((error) => {
          console.log(error);
          setDisabled(false);
        });
      }}
    />
  );
};

export default Login;
