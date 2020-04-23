import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase, { db } from '../lib/firebase';
import { refreshUser } from '../lib/user';

const Favorite = ({ id }) => {
  const [user, setUser] = useState(null);
  const [alreadyFav, setAlreadyFav] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    setUser(localUser);
    setAlreadyFav(localUser && localUser.favorites && localUser.favorites[id]);
  }, []);

  if (alreadyFav) {
    return (
      <div>
        <button
          disabled={disabled}
          type="button"
          className="fa fa-heart"
          onClick={() => {
            setDisabled(true);
            db.collection('users').doc(user.uid).collection('favorites').doc(id)
              .delete()
              .then(() => {
                const newUser = { favorites: { [id]: null }, ...user };
                localStorage.setItem('user', JSON.stringify(newUser));

                setAlreadyFav(false);
                setDisabled(false);
              })
              .catch((e) => {
                setDisabled(false);
                console.log(e);
              });
          }}
        >
          Unfavorite
        </button>
      </div>
    );
  }
  return (
    <div>
      <button
        disabled={disabled || alreadyFav}
        type="button"
        className="fa fa-heart"
        onClick={() => {
          if (!user) {
            document.getElementById('fb_login').click();
            return;
          }
          setDisabled(true);
          db.collection('users').doc(user.uid).collection('favorites').doc(id)
            .set({ createdAt: firebase.firestore.FieldValue.serverTimestamp() })
            .then(() => {
              const newUser = { favorites: { [id]: { createdAt: new Date() } }, ...user };
              localStorage.setItem('user', JSON.stringify(newUser));

              setAlreadyFav(true);
              setDisabled(false);
            })
            .catch((e) => {
              setDisabled(false);
              console.log(e);
            });
        }}
      >
        Favorite
      </button>
    </div>
  );
};

Favorite.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Favorite;
