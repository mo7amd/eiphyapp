import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Grid = (props) => {
  const { imgs: propImgs, loadMore, currentImg } = props;
  const [imgs, setImgs] = useState(propImgs);
  const [hasMore, setHasMore] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  const init = async () => {
    setImgs((await loadMore()));
  };

  useEffect(() => {
    const handleScroll = (e) => {
      // Do something here ...
      const ele = e.currentTarget.scrollingElement;
      // Condition to check if scroll reached bottom or not
      const isBottom = ele.scrollHeight - ele.scrollTop === ele.clientHeight;
      setShowLoader(true);
      if (hasMore && imgs && imgs.length >= 10 && isBottom) {
        loadMore(imgs[imgs.length - 1].id).then((data) => {
          if (!data || !data.length || data.length < 10) {
            setHasMore(false);
          }
          if (data && data.length) {
            setImgs((oldImgs) => oldImgs.concat(data));
            setShowLoader(false);
          }
        });
      }
    };
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      // This cleans up the event handler when the component unmounts.
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!imgs || !(Object.keys(imgs) || imgs).length) {
      if (propImgs && propImgs.length) {
        setImgs(propImgs);
      } else {
        init();
      }
    }
  }, [propImgs]);

  return (
    <div className="grid-view">
      {imgs.map((img, key) => currentImg.id !== img.id && (
        <div key={key} className="img-card">
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
      {showLoader && (
      <div className="lds-ellipsis ">
        <div />
        <div />
        <div />
        <div />
      </div>
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
