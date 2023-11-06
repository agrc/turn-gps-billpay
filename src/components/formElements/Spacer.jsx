import PropTypes from 'prop-types';

function Spacer({ className }) {
  return <div className={className} />;
}

export default Spacer;

Spacer.propTypes = {
  className: PropTypes.string,
};

Spacer.defaultProps = {
  className: 'my-2',
};
