import { db } from './firebase';

export const refreshUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return user;
  }
  return db.collection('users').doc(user.uid).get().then((user) => localStorage.setItem('user', JSON.stringify(user)));
};
