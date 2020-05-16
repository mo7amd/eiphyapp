import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from '../lib/firebase';

const Logout = ({ callback }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        setDisabled(true);
        firebase.auth().signOut().then(() => {
          localStorage.removeItem('user');
          callback();
        }).catch((error) => {
          console.error(error);
          setDisabled(false);
        });
      }}
    >
      Logout
    </button>
  );
};

Logout.defaultProps = {
  callback: () => {},
};

Logout.propTypes = {
  callback: PropTypes.func,
};

export default Logout;
