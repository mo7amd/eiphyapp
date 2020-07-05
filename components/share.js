import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadScript } from '../lib/helpers';
import Copy from './copy';

class Share extends Component {
  componentDidMount() {
    loadScript('https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5e9f4f69b93ccfd1').then(() => {
      try {
        window.addthis.layers.refresh();
      } catch (e) {
        console.error(e);
      }
    });
  }

  render() {
    const { link, title, description } = this.props;
    const shareLink = encodeURIComponent(link);

    return (
      <div>
        <Copy link={link} />
        <div
          role="presentation"
          className="addthis_inline_share_toolbox"
          data-url={shareLink}
          data-title={title}
          data-description={description}
        />
      </div>
    );
  }
}

Share.defaultProps = {
  link: '',
  title: '',
  description: '',
};

Share.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};


export default Share;
