import React, { useState, useEffect, useRef } from 'react';
import slugify from 'slugify';
import firebase from '../../lib/firebase';

export default function Finalize() {
  const [imgUrl, setImg] = useState('');
  const [tags, setTag] = useState([]);
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
      setTag((t) => ([
        ...t,
        slug,
      ]));
    }
  };

  const onUploadHandler = async (e) => {
    e.preventDefault();
    const ref = firebase.storage().ref();
    const db = firebase.database().ref();
    const name = new Date().getTime().toString();
    const img = ref.child(`/gifs/${name}.gif`);
    const blob = await fetch(imgUrl).then((res) => res.blob());
    img.put(blob).then(({ metadata }) => {
      const { fullPath } = metadata;
      const updates = {
        tags,
        url: fullPath,
        meta: {},
        isPublic: true,
        sourceUrl: '',
      };
      const newPost = db.child('gifs').push(updates);
      newPost
        .then((o) => {
        })
        .catch((e) => {
        });
    });
  };

  return (
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
              tags.map((tag) => (
                <li>{tag}</li>
              ))
            }
          </ul>
          <button type="button" onClick={(e) => onUploadHandler(e)}>Upload Gif</button>
        </div>
      </div>
    </div>
  );
}
