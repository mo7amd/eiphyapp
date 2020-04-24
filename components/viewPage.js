import DefaultErrorPage from 'next/dist/pages/_error';
import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import ImgView from './imgView';

const ViewPage = ({ img, imgs }) => (
  <Layout>
    {img && img.id ? <ImgView img={img} imgs={imgs} /> : <DefaultErrorPage statusCode={404} />}
  </Layout>
);

ViewPage.defaultProps = {
  img: {},
  imgs: [],
};

ViewPage.propTypes = {
  img: PropTypes.object,
  imgs: PropTypes.array,
};

export default ViewPage;
