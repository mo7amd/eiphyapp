import React from 'react';
import PropTypes from 'prop-types';

const Copy = ({ link }) => {
  let copyInput = null;

  const copyLink = () => {
    copyInput.select();
    document.execCommand('copy');
  };

  return (
    <div>
      <input
        className="form-control"
        onChange={() => {
        }}
        type="text"
        ref={(input) => {
          copyInput = input;
        }}
        value={link}
        dir="ltr"
      />
      <button
        className="btn btn-outline-dark"
        type="button"
        onClick={copyLink}
      >
        Copy
      </button>
    </div>
  );
};

Copy.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Copy;
