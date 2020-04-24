import React, { useState } from 'react';
import { FacebookLoginButton } from 'react-social-login-buttons';
import slugify from 'slugify';
import firebase, { db } from '../lib/firebase';

const Login = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <FacebookLoginButton
      id="fb_login"
      text="Login"
      disabled={disabled}
      onClick={() => {
        setDisabled(true);
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(async ({
          user: {
            uid,
            username,
            email,
            displayName,
            photoURL,
            isAnonymous,
            emailVerified,
            providerData,
          },
        }) => {
          const newUser = {
            ...providerData[0],
            uid,
            username: username || (email && email.split('@')[0]) || (slugify(displayName)),
            email,
            displayName,
            photoURL,
            isAnonymous,
            emailVerified,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          };

          // sync with users collection
          const userRef = db.collection('users').doc(uid);
          const oldUser = (await userRef.get()).data();
          const user = Object.assign(newUser, oldUser);
          if (!oldUser) {
            userRef.set(user);
          }

          // store for local usage later
          localStorage.setItem('user', JSON.stringify(user));
        }).catch((error) => {
          console.error(error);
          setDisabled(false);
        });
      }}
    />
  );
};

export default Login;
