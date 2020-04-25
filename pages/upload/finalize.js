import React, { useEffect, useRef, useState } from 'react';
import slugify from '../../lib/slugify';
import firebase, { db } from '../../lib/firebase';
import Login from '../../components/login';
import Layout from '../../components/layout';

export default function Finalize() {
  const [imgUrl, setImg] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState(firebase.auth().currentUser);

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  const keywordRef = useRef();
  useEffect(() => {
    setImg(localStorage.getItem(process.env.IMG_PREVIEW));
  }, []);
  useEffect(() => {
    keywordRef.current.value = '';
  }, [keywords]);
  const onAddTagHandler = (e) => {
    e.preventDefault();
    let value = keywordRef.current && keywordRef.current.value;
    if (typeof value === 'string' && value !== '' && value.length <= 50 && keywords.length <= 10) {
      value = value.toLowerCase().replace(/\s/g, '_');
      if (keywords.includes(value)) {
        keywordRef.current.value = '';
        return;
      }
      setKeywords((t) => ([
        ...t,
        value,
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

    const tags = Array.from(new Set(keywords
      .map((keyword) => slugify(keyword, { lower: true, strict: true }))));
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
        keywords,
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
          const href = `/${type}/${o.id}`;
          fetch(href).then(() => {
            setTimeout(() => {
              window.location.href = href;
            }, 500);
          });
        });
    }).catch((e) => {
      setDisabled(true);
      console.error(e);
    });
  };


  let uploadButton = (
    <button disabled={disabled || keywords.length < 3} type="button" onClick={(e) => onUploadHandler(e)}>
      Upload
      Gif
    </button>
  );
  if (!user) {
    uploadButton = <Login />;
  }
  const deleteKeyword = (tag) => () => { setKeywords((allKeywords) => allKeywords.filter((t) => t !== tag)); };
  return (
    <Layout>
      <div className="container text-center">
        <div className="row">
          <div key="img-viewer" className="col-lg-6 col-sm-12">
            <img src={imgUrl} alt="" />
          </div>
          <div key="img-info" className="col-lg-6 col-sm-12">
            <form onSubmit={(e) => onAddTagHandler(e)}>
              <label htmlFor="keywords">
                <input ref={keywordRef} id="keywords" type="text" />
                <button type="submit" className="" disabled={keywords.length > 10}>
                  add
                </button>
              </label>
            </form>
            <ul>
              {
                keywords.map((keyword, key) => (
                  <li key={key}>
                    {keyword}
                    {' '}
                    <button type="button" onClick={deleteKeyword(keyword)}>Delete</button>
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
