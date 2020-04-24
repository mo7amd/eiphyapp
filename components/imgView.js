import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DefaultSeo } from 'next-seo';
import DefaultErrorPage from 'next/error';
import SingleImg from './singleImg';
import Grid from './grid';
import { getPostById, getSimilar } from '../lib/query';
import SEO from '../next-seo.config';
import Share from './share';
import Favorite from './favorite';
import firebase from '../lib/firebase';

const ImgView = (props) => {
  const {
    type, id, img: propImg, imgs,
  } = props;
  const [img, setImg] = useState(propImg);

  const init = async () => {
    setImg(await getPostById(id));
  };

  useEffect(() => {
    if (!img || !(Object.keys(img) || img).length) { init(); }
    firebase.analytics().logEvent('imgView', { id });
  }, [id]);

  if (!img || !(Object.keys(img) || img).length) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <DefaultSeo {...SEO} />

      <SingleImg img={img} />
      <p>
        views:
        {img.views}
      </p>
      <div>
        username:
        {img.user.username}
      </div>
      <Favorite id={id} />
      <Share link={`/${img.type}/${img.id}`} />
      <Grid
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
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  img: PropTypes.any,
  imgs: PropTypes.array,
};

export default ImgView;
