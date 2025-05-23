// @ts-check
import PropTypes from 'prop-types';

/** @typedef {import ('../../jsDocTypes').Address} Address */

const AddressShape = PropTypes.shape({
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  streetAddress1: PropTypes.string.isRequired,
  streetAddress2: PropTypes.string,
  zipCode: PropTypes.string.isRequired,
});

const propTypes = {
  agencyTitleFirstLine: PropTypes.string.isRequired,
  agencyTitleSecondLine: PropTypes.string.isRequired,
  address: AddressShape.isRequired,
  email: PropTypes.string.isRequired,
  logo: PropTypes.node.isRequired,
  phone: PropTypes.string,
};

/**
 * @param {Object} props
 * @param {string} props.agencyTitleFirstLine ie Utah Department of (smaller font above main title)
 * @param {string} props.agencyTitleSecondLine ie Government Operations (larger font below firstLine)
 * @param {Address} props.address
 * @param {string} props.email
 * @param {React.ReactNode} props.logo
 * @param {string} props.phone
 * @returns {JSX.Element}
 */
function FooterInformationInfo({
  agencyTitleFirstLine,
  agencyTitleSecondLine,
  address,
  email,
  logo,
  phone,
}) {
  return (
    <>
      <div className="footer-agency-information__image-title-wrapper">
        <div className="footer-agency-information__title-image">{logo}</div>
        <div className="footer-agency-information__first-line">
          {agencyTitleFirstLine}
        </div>
      </div>
      <div className="footer-agency-information__title">
        <div className="footer-agency-information__second-line">
          {agencyTitleSecondLine}
        </div>
      </div>

      <div className="footer-agency-information__address">
        <span className="footer-agency-information__address-street-address-1">
          {address.streetAddress1}
        </span>
        <br />
        {address.streetAddress2 ? (
          <>
            <span className="footer-agency-information__address-street-address-2">
              {address.streetAddress2}
            </span>
            <br />
          </>
        ) : undefined}
        <span className="footer-agency-information__address-city-state-zip">
          {address.city}, {address.state} {address.zipCode}
        </span>
      </div>

      <div className="footer-agency-information__email">
        <a href={`mailto:${email}`}>{email}</a>
      </div>

      {phone && (
        <div className="footer-agency-information__phone">
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
      )}
    </>
  );
}

FooterInformationInfo.propTypes = propTypes;

export default FooterInformationInfo;
