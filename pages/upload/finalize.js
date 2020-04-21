import React, { useEffect, useRef, useState } from 'react';
import slugify from 'slugify';
import { useRouter } from 'next/router';
import firebase, { db, storage } from '../../lib/firebase';
import Login from '../../components/login';
import Layout from '../../components/layout';

export default function Finalize() {
  const [imgUrl, setImg] = useState('');
  const [tags, setTag] = useState([]);
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
      setTag((t) => ([
        ...t,
        slug,
      ]));
    }
  };

  const onUploadHandler = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const name = new Date().getTime().toString();
    const blob = await fetch(imgUrl).then((res) => res.blob());
    const fileType = blob.type.split('/')[1];
    const collection = fileType === 'gif' ? 'gifs' : 'memes';
    const img = storage.ref().child(`/${collection}/${name}.${fileType}`);

    img.put(blob).then(async ({ ref }) => {
      const postData = {
        tags,
        url: (await ref.getDownloadURL()).split('&token')[0],
        meta: {},
        isPublic: true,
        sourceUrl: '',
        views: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user,
      };
      const newPost = db.collection(collection).add(postData);
      newPost
        .then((o) => {
          router.push(`/${collection}/${o.id}`);
        })
        .catch((e) => {
          setDisabled(true);
          console.error(e);
        });
    }).catch((e) => {
      setDisabled(true);
      console.error(e);
    });
  };

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
                <button type="submit" className="">
                  add
                </button>
              </label>
            </form>
            <ul>
              {
                tags.map((tag, key) => (
                  <li key={key}>{tag}</li>
                ))
              }
            </ul>
            <button disabled={disabled} type="button" onClick={(e) => onUploadHandler(e)}>
              Upload
              Gif
            </button>
            {!user && (<Login />)}
          </div>
        </div>
      </div>
    </Layout>
  );
}
