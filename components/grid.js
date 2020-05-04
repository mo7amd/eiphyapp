import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { GridLayout } from '@egjs/react-infinitegrid';
import ProgressiveImage from 'react-progressive-image';

const colors = ['#07ff98', '#ff6665', '#05ccff', '#9933ff', '#fff35c'];

const loading = (
  <div className="loading">
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

function getItems(nextGroupKey, nextKey, imgs, currentImg) {
  const nextItems = [];

  for (let i = 0, len = imgs.length; i < len; ++i) {
    const img = imgs[i];
    if (img.id !== currentImg.id) {
      nextItems.push({ groupKey: nextGroupKey, key: nextKey + i, img });
    }
  }
  return nextItems;
}

const imgLoading = (num) => <div style={{ backgroundColor: colors[num % colors.length], width: '100%', height: '100%' }} />;

const Item = ({ img, num }) => (
  <div
    key={num}
    className="item"
    style={{ height: img.thumb.height, width: img.thumb.width, overflow: 'hidden' }}
  >
    <Link href={`/${img.type}/${img.id}`} prefetch={false}>
      <a>
        <ProgressiveImage
          src={img.thumb.url}
          placeholder=""
          data-width={img.thumb.width}
          data-height={img.thumb.height}
        >
          {(src, loading) => (loading ? imgLoading(num) : <img src={src} alt={img.keywords.join(', ')} />)}
        </ProgressiveImage>
        <div className="img-tags-hover">
          {img.keywords.map((tag) => `#${tag} `)}
        </div>
      </a>
    </Link>
  </div>
);

Item.propTypes = {
  img: PropTypes.object.isRequired,
  num: PropTypes.number.isRequired,
};

function endLoading(e) {
  setTimeout(() => {
    e.endLoading();
  }, 1000);
}

function onAppend(e, hasMore, imgs, loadMore, setHasMore, setImgs, currentImg) {
  if (e.currentTarget.isProcessing() || !hasMore || !imgs || imgs.length < 25) {
    return;
  }

  const nextGroupKey = (e.groupKey || 0) + 1;
  const nextKey = imgs.length;
  e.startLoading();
  loadMore(imgs[nextKey - 1].img.id)
    .then((data) => {
      if (!data || !data.length || data.length < 25) {
        setHasMore(false);
      }
      if (data && data.length) {
        setImgs(imgs.concat(getItems(nextGroupKey, nextKey, data, currentImg)));
      }
      endLoading(e);
    });
}

const Grid = (props) => {
  const { imgs: propImgs, loadMore, currentImg } = props;
  const [imgs, setImgs] = useState(getItems(0, 0, propImgs, currentImg));
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!imgs || !(Object.keys(imgs) || imgs).length) {
      (async function init() {
        const aImgs = propImgs && propImgs.length ? propImgs : (await loadMore());
        setImgs(getItems(0, 0, aImgs, currentImg));
      }());
    }
  }, [propImgs]);

  return (
    <GridLayout
      className="gridlayout"
      loading={loading}
      groupBy={(item) => item.props['data-groupkey']}
      options={{
        isOverflowScroll: false,
        useRecycle: true,
        horizontal: false,
        useFit: true,
        useFirstRender: true,
        threshold: 25,
        transitionDuration: 0,
      }}
      layoutOptions={{
        margin: 5,
      }}
      onAppend={(e) => onAppend(e, hasMore, imgs, loadMore, setHasMore, setImgs, currentImg)}
      onLayoutComplete={(e) => !e.isLayout && endLoading(e)}
    >
      {imgs.map((img) => (
        <Item
          data-groupkey={img.groupKey}
          key={img.key}
          num={img.key}
          img={img.img}
        />
      ))}
    </GridLayout>
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
