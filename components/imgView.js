import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DefaultErrorPage from 'next/error';
import Link from 'next/link';
import SingleImg from './singleImg';
import Grid from './grid';
import { getSimilar } from '../lib/query';
import Share from './share';
import Favorite from './favorite';
import firebase, { db, config } from '../lib/firebase';

const ImgView = (props) => {
  const {
    img, imgs,
  } = props;

  useEffect(() => {
    if (img && img.id) {
      firebase.analytics().logEvent('imgView', { description: img.id });
      try {
        (Math.random() < 0.5) && db.collection('posts').doc(img.id).update({ views: firebase.firestore.FieldValue.increment(1) });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!img || !(Object.keys(img) || img).length) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div className="img-viewer">
        <SingleImg img={img} />
        <div className="img-viewer__info">
          {/* <h4> */}
          {/*  views: */}
          {/*  {' '} */}
          {/*  {img.views} */}
          {/* </h4> */}
          {/* <h4>
            username:
            {' '}
            {img.user.username}
          </h4> */}
          <div className="col justify-content-center align-items-center">
            <Favorite id={img.id} />
            <Share link={`${config.frontend}/${img.type}/${img.id}`} />
          </div>
        </div>
      </div>
      <div id="img-tags-container">
        {img.keywords.map((tag, key) => tag && (
          <Link href={`/search/${tag}`} key={key} prefetch={false}>
            <a className="img-tag" key={`${tag}_${key}`} href="#">{`#${tag}`}</a>
          </Link>
        ))}
      </div>
      <Grid
        style={{ marginTop: '5%' }}
        currentImg={img}
        imgs={imgs}
        loadMore={(startAfter) => getSimilar({ searchParam: img.tags, startAfter })}
      />

    </div>
  );
};

ImgView.defaultProps = {
  img: {},
  imgs: [],
};

ImgView.propTypes = {
  img: PropTypes.any,
  imgs: PropTypes.array,
};

export default ImgView;
