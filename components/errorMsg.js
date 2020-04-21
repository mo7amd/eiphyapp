import PropTypes from 'prop-types';

export default function ErrorMsg({ msg }) {
  if (msg === '') return false;
  return (<p>{msg}</p>);
}

ErrorMsg.propTypes = {
  msg: PropTypes.string,
};
ErrorMsg.defaultProps = {
  msg: '',
};
