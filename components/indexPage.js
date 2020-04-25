import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import Grid from './grid';
import { getTrending } from '../lib/query';

const IndexPage = ({ imgs, type }) => (
  <Layout>
    <Grid
      imgs={imgs}
      loadMore={(startAfter) => getTrending({ startAfter, type })}
    />
  </Layout>

);

IndexPage.defaultProps = {
  imgs: [],
  type: null,
};

IndexPage.propTypes = {
  imgs: PropTypes.array,
  type: PropTypes.string,
};

export default IndexPage;
