import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ProgressiveImage from 'react-progressive-image';

const Grid = (props) => {
  const { imgs: propImgs, loadMore, currentImg } = props;
  const [imgs, setImgs] = useState(propImgs);
  const [hasMore, setHasMore] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const colors = ['#07ff98', '#ff6665', '#05ccff','#9933ff','#fff35c'];


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


  const renderPlaceholder = (height, width) => {
    const colorPicked = colors[Math.floor(Math.random() * colors.length)];

    return (
      <div
        style={{ backgroundColor: colorPicked, height, width }}
      />
    );
  };

  const enableHover = (e) => {
    e.currentTarget.children[1].className = 'img-tags-hover img-tags-hover-active';
  }

  const disableHover = (e) => {
    e.currentTarget.children[1].className = 'img-tags-hover';
  }

  return (
    <div className="grid-view">
      {imgs.map((img, key) => currentImg.id !== img.id && (
        <div key={key} className="img-card" onMouseOver={enableHover} onMouseLeave={disableHover}>
          <Link href={`/${img.type}/${img.id}`}>
            <a>
              <ProgressiveImage src={img.thumb.url} placeholder="">
                {(src, loading) => (loading ? renderPlaceholder(img.thumb.height, img.thumb.width) : <img src={src} alt="an image" />)}
              </ProgressiveImage>
            </a>
          </Link>
          <div className="img-tags-hover">
                <span>
                {img.keywords.map((tag) => tag && (
                  `#${tag} `
                ))}
                </span>
          </div>
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
