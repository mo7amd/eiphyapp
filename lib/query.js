import firebase, { db } from './firebase';

// startAfter is the last ref not index
export const search = (collection, searchParam, startAfter = null, limit = 10, orderBy = null, orderDir = 'desc') => {
  let query = db.collection(collection);

  if (searchParam) {
    query = query.where('tags', 'array-contains-any', searchParam.split(' '));
  }

  if (orderBy) {
    query = query.orderBy(orderBy, orderDir);
  }

  if (startAfter) {
    query = query.startAfter(startAfter);
  }

  return query.limit(limit)
    .get()
    .then((querySnapshot) => {
      const imgs = [];
      querySnapshot.forEach((doc) => imgs.push(doc.data()));
      return imgs;
    });
};

export const getTrending = (collection, startAfter = null, limit = 10) => search(collection, null, startAfter, limit, 'views', 'desc');

export const getById = (collection, id, countView = true) => db.collection(collection)
  .doc(id)
  .get()
  .then((doc) => {
    if (countView && doc && doc.ref) {
      doc.ref.update({ views: firebase.firestore.FieldValue.increment(1) });
    }
    return doc.data();
  });
