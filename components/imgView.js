import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DefaultSeo } from 'next-seo';
import DefaultErrorPage from 'next/error';
import SingleImg from './singleImg';
import Grid from './grid';
import { getSimilar } from '../lib/query';
import SEO from '../next-seo.config';
import Share from './share';
import Favorite from './favorite';
import firebase from '../lib/firebase';

const ImgView = (props) => {
  const {
    img, imgs,
  } = props;

  useEffect(() => {
    firebase.analytics().logEvent('imgView', { id: img.id });
  }, []);

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
      <Favorite id={img.id} />
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
  img: PropTypes.any,
  imgs: PropTypes.array,
};

export default ImgView;
