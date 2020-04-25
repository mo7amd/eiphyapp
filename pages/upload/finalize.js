import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import slugify from '../../lib/slugify';
import firebase, { db } from '../../lib/firebase';
import Login from '../../components/login';
import Layout from '../../components/layout';

export default function Finalize() {
  const [imgUrl, setImg] = useState('');
  const [tags, setTags] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState(firebase.auth().currentUser);
  const router = useRouter();

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  const tagRef = useRef();
  useEffect(() => {
    setImg(localStorage.getItem(process.env.IMG_PREVIEW));
  }, []);
  useEffect(() => {
    tagRef.current.value = '';
  }, [tags]);
  const onAddTagHandler = (e) => {
    e.preventDefault();
    const value = tagRef.current && tagRef.current.value;
    if (typeof value === 'string' && value !== '') {
      const slug = slugify(value, {
        lower: true,
        strict: true,
      });
      if (tags.includes(slug)) {
        tagRef.current.value = '';
        return;
      }
      setTags((t) => ([
        ...t,
        slug,
      ]));
    }
  };

  const onUploadHandler = async (e) => {
    e.preventDefault();
    setDisabled(true);
    if (!user) {
      console.error('Not User');
      return;
    }
    const date = new Date();
    const folder = `${date.getFullYear().toString().substring(2)}${date.getMonth() + 1}${date.getDate()}`;

    const tagsName = tags.join('_').substring(0, 20);
    const suffix = date.getTime().toString().substring(5);
    const name = `${tagsName}_${suffix}`;

    const blob = await fetch(imgUrl).then((res) => res.blob());
    const fileType = blob.type.split('/')[1];
    const type = fileType === 'gif' ? 'gifs' : 'memes';
    const storage = firebase.storage();
    const img = storage.ref().child(`/${type}/${folder}/${name}.${fileType}`);

    const localUser = JSON.parse(localStorage.getItem('user'));
    img.put(blob, { user: user.uid }).then(() => {
      const url = `https://firebasestorage.googleapis.com/v0/b/eiphyappfinal.appspot.com/o/${type}%2F${folder}%2F${name}_600x315.${fileType}?alt=media`;
      const thumb = `https://firebasestorage.googleapis.com/v0/b/eiphyappfinal.appspot.com/o/${type}%2F${folder}%2F${name}_200x200.${fileType}?alt=media`;

      const postData = {
        tags,
        url,
        thumb,
        meta: {},
        isPublic: true,
        sourceUrl: '',
        views: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user: {
          [user.uid]: {
            username: localUser.username,
            displayName: localUser.displayName,
            photoURL: localUser.photoURL,
          },
        },
        type,
      };

      db.collection('posts').add(postData)
        .then((o) => {
          setTimeout(() => {
            window.location.href = `/${type}/${o.id}`;
          }, 1500);
        });
    }).catch((e) => {
      setDisabled(true);
      console.error(e);
    });
  };


  let uploadButton = (
    <button disabled={disabled || tags.length < 3} type="button" onClick={(e) => onUploadHandler(e)}>
      Upload
      Gif
    </button>
  );
  if (!user) {
    uploadButton = <Login />;
  }
  const deleteTag = (tag) => () => { setTags((allTags) => allTags.filter((t) => t !== tag)); };
  return (
    <Layout>
      <div className="container text-center">
        <div className="row">
          <div key="img-viewer" className="col-lg-6 col-sm-12">
            <img src={imgUrl} alt="" />
          </div>
          <div key="img-info" className="col-lg-6 col-sm-12">
            <form onSubmit={(e) => onAddTagHandler(e)}>
              <label htmlFor="tags">
                <input ref={tagRef} id="tags" type="text" />
                <button type="submit" className="" disabled={tags.length > 10}>
                  add
                </button>
              </label>
            </form>
            <ul>
              {
                tags.map((tag, key) => (
                  <li key={key}>
                    {tag}
                    {' '}
                    <button type="button" onClick={deleteTag(tag)}>Delete</button>
                  </li>
                ))
              }
            </ul>
            {uploadButton}
          </div>
        </div>
      </div>
    </Layout>
  );
}
