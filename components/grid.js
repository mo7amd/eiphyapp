import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Grid = (props) => {
  const { imgs: propImgs, loadMore } = props;
  const [imgs, setImgs] = useState(propImgs || []);

  const init = async () => {
    setImgs((await loadMore(0)));
  };
  useEffect(() => { init(); }, [propImgs]);

  return (
    <div>
      {imgs.map((img, key) => (<div key={key}><img src={img.url} alt="" /></div>))}
    </div>
  );
};

Grid.defaultProps = {
  imgs: [],
};

Grid.propTypes = {
  imgs: PropTypes.array,
  loadMore: PropTypes.func.isRequired,
};

export default Grid;
