import PropTypes from 'prop-types';

export default function ErrorMessageTag({ children }) {
  return (
    <p className="justify-center">
      {children}
    </p>
  );
}

ErrorMessageTag.propTypes = {
  children: PropTypes.string,
};
