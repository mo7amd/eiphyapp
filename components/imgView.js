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
import firebase, { config } from '../lib/firebase';

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
      <div className="img-viewer">
        <SingleImg img={img} />
        <div className="img-viewer__info">
          <h4>
            views:
            {' '}
            {img.views}
          </h4>
          {/* <h4>
            username:
            {' '}
            {img.user.username}
          </h4> */}
          <Favorite id={img.id} />
          <Share link={`${config.frontend}/${img.type}/${img.id}`} />
        </div>
      </div>
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
