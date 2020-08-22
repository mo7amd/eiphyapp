import React, { useState } from 'react';
import { FacebookLoginButton } from 'react-social-login-buttons';
import slugify from 'slugify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import firebase, { db } from '../lib/firebase';
import { slugOptions } from '../lib/slugify';

const Login = ({ callback }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <FacebookLoginButton
      className="login"
      text="Login"
      style={{
        backgroundColor: '#3e3e3e',
        textAlign: 'center',
        width: 'fit-content',
        display: 'inline-block',
      }}
      activeStyle={{
        backgroundColor: '#3e3e3e',
      }}
      icon={() => <FontAwesomeIcon icon={faUserFriends} size="1x" color="white" swapOpacity />}
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
            username: username || (email && email.split('@')[0]) || (slugify(displayName, slugOptions)),
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
          localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            isAnonymous: user.isAnonymous,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
          }));

          callback();
        }).catch((error) => {
          console.error(error);
          setDisabled(false);
        });
      }}
    />
  );
};

Login.defaultProps = {
  callback: () => {},
};

Login.propTypes = {
  callback: PropTypes.func,
};

export default Login;
