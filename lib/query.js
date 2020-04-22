import firebase, { db } from './firebase';

const serializeJson = (doc) => {
  if (!doc) { return doc; }
  const { ref } = doc;
  const data = doc.data();
  data.id = ref.id;
  data.collection = ref.parent.id;
  data.rPath = ref.path;
  if (data && data.createdAt) {
    data.createdAt = data.createdAt.toDate();
  }
  if (data && data.user) {
    data.user = data.user.id;
  }
  return data;
};

// startAfter is the last ref not index
export const search = (collection, searchParam, startAfter = null, limit = 10, orderBy = null, orderDir = 'desc') => {
  let query = db.collection(collection);

  if (searchParam) {
    const searchArray = Array.isArray(searchParam) ? searchParam : searchParam.split(' ');
    query = query.where('tags', 'array-contains-any', searchArray);
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
      querySnapshot.forEach((doc) => imgs.push(serializeJson(doc)));
      return imgs;
    });
};

export const getTrending = (collection, startAfter = null, limit = 10) => search(collection, null, startAfter, limit, 'views', 'desc');

export const getSimilar = search;

export const getById = (collection, id, countView = true) => db.collection(collection)
  .doc(id)
  .get()
  .then((doc) => {
    if (countView && doc && doc.ref) {
      doc.ref.update({ views: firebase.firestore.FieldValue.increment(1) });
    }
    return serializeJson(doc);
  });
