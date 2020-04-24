import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Grid = (props) => {
  const { imgs: propImgs, loadMore, currentImg } = props;
  const [imgs, setImgs] = useState(propImgs);
  const [hasMore, setHasMore] = useState(true);

  const init = async () => {
    setImgs((await loadMore()));
  };
  useEffect(() => {
    if (!imgs || !(Object.keys(imgs) || imgs).length) { init(); }
  }, [propImgs]);

  return (
    <div>
      {imgs.map((img, key) => currentImg.id !== img.id && (
        <div key={key}>
          <Link href={`/${img.type}/${img.id}`}>
            <a>
              <img
                src={img.thumb}
                alt=""
              />
            </a>
          </Link>
        </div>
      ))}

      {hasMore && imgs && imgs.length >= 10 && (
      <button
        type="button"
        onClick={() => {
          loadMore(imgs[imgs.length - 1].id).then((data) => {
            if (!data || !data.length || data.length < 10) {
              setHasMore(false);
            }
            if (data && data.length) {
              setImgs((oldImgs) => oldImgs.concat(data));
            }
          });
        }}
      >
        Load More
      </button>
      )}
    </div>
  );
};

Grid.defaultProps = {
  imgs: [],
  currentImg: {},
};

Grid.propTypes = {
  imgs: PropTypes.array,
  currentImg: PropTypes.object,
  loadMore: PropTypes.func.isRequired,
};

export default Grid;
