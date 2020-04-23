import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Grid = (props) => {
  const { imgs: propImgs, loadMore } = props;
  const [imgs, setImgs] = useState(propImgs);

  const init = async () => {
    setImgs((await loadMore(0)));
  };
  useEffect(() => {
    if (!imgs || !(Object.keys(imgs) || imgs).length) { init(); }
  }, [propImgs]);

  return (
    <div>
      {imgs.map((img, key) => (
        <div key={key}>
          <Link href={`/${img.type}/${img.id}`}>
            <a>
              <img
                src={img.url}
                alt=""
              />
            </a>
          </Link>
        </div>
      ))}
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
