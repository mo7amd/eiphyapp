import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DefaultSeo } from 'next-seo';
import SingleImg from './singleImg';
import Grid from './grid';
import { getById, getSimilar } from '../lib/query';
import SEO from '../next-seo.config';
import Share from './share';

const ImgView = (props) => {
  const {
    type, id, img: propImg, imgs,
  } = props;
  const [img, setImg] = useState(propImg);

  const init = async () => {
    setImg(await getById(type, id));
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <div>
      <DefaultSeo {...SEO} />

      <SingleImg img={img} />
      <p>
        views:
        {img.views}
      </p>
      <Share link={(typeof location !== 'undefined' && location.href) || img.url} />
      <Grid
        imgs={imgs}
        loadMore={(offset) => getSimilar(type, img.tags, offset)}
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
