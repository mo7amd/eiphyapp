import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ imgs }) => (
  <div>
    {imgs.map((img) => (<div><img src={img.url} alt="" /></div>))}
  </div>
);

Grid.defaultProps = {
  imgs: [],
};

Grid.propTypes = {
  imgs: PropTypes.array,
};

export default Grid;
