import firebase, { db } from './firebase';
import slugify from './slugify';

const serializeJson = (doc) => {
  if (!doc) {
    return doc;
  }
  const { ref } = doc;
  const data = doc.data();
  if (!data) {
    return data;
  }
  data.id = ref.id;
  data.collection = ref.parent.id;
  data.rPath = ref.path;
  if (data && data.createdAt) {
    data.createdAt = data.createdAt.toDate().toJSON();
  }
  if (data && data.user) {
    const uid = Object.keys(data.user)[0];
    data.user = { ...data.user[uid], id: uid };
  }
  return data;
};

// startAfter is the last ref not index
export const search = async ({
  searchParam,
  type,
  startAfter,
  limit = 10,
  orderBy,
  orderDir,
  fulltext = false,
} = {}) => {
  let query = db.collection('posts');

  if (type) {
    query = query.where('type', '==', type);
  }

  if (searchParam) {
    let searchArray = Array.isArray(searchParam) ? searchParam : searchParam.split(' ');
    searchArray = searchArray.map((value) => slugify(value, {
      lower: true,
      strict: true,
    }));
    if (fulltext) {
      searchArray = await firebase.functions().httpsCallable('searchTags')({ searchParam: searchArray.join(' ') }).map((x) => x);
    }
    query = query.where('tags', 'array-contains-any', searchArray);
  }

  if (orderBy) {
    query = query.orderBy(orderBy, orderDir);
  }

  if (startAfter) {
    query = query.startAfter(await db.collection('posts').doc(startAfter).get());
  }

  return query.limit(limit)
    .get()
    .then((querySnapshot) => {
      const imgs = [];
      querySnapshot.forEach((doc) => imgs.push(serializeJson(doc)));
      return imgs;
    });
};

export const getTrending = ({ type, startAfter, limit = 10 } = {}) => search({
  type, startAfter, limit, orderBy: 'views', orderDir: 'desc',
});

export const getNew = ({ type, startAfter, limit = 10 } = {}) => search({
  type, startAfter, limit, orderBy: 'createdAt', orderDir: 'asc',
});

export const getSimilar = search;

export const getPostById = (id) => db.collection('posts')
  .doc(id)
  .get()
  .then((doc) => serializeJson(doc));
