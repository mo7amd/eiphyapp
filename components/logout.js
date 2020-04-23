import React, { useState } from 'react';
import firebase from '../lib/firebase';

const Logout = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        setDisabled(true);
        firebase.auth().signOut().then(() => {
          localStorage.removeItem('user');
        }).catch((error) => {
          console.log(error);
          setDisabled(false);
        });
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
