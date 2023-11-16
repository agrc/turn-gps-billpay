import PropTypes from 'prop-types';

export default PropTypes.exact({
  organization: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  additionalEmail: PropTypes.string,
  address1: PropTypes.string,
  address2: PropTypes.string,
  city: PropTypes.string,
  phoneNumber: PropTypes.string,
  zipCode: PropTypes.string,
  isBusy: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  // title is put in as the "children" of the Button component
  title: PropTypes.string,
  stateCode: PropTypes.oneOf(['UT', 'NV']),
});
