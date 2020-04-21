import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DefaultSeo } from 'next-seo';
import SingleImg from './singleImg';
import Grid from './grid';
import { getById, search } from '../lib/query';
import SEO from '../next-seo.config';
import Share from './share';

const ImgView = (props) => {
  const { type, id } = props;
  const [img, setImg] = useState({});

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
        loadMore={(offset) => search(type, img.tags && img.tags[0], offset)}
      />

    </div>
  );
};

ImgView.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ImgView;
