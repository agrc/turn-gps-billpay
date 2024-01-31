import { ExternalLink } from '@utahdts/utah-design-system';
import signInImage from '../../static/images/sign-in-button.png';
import utahIdCreateAccountImage from '../../static/images/utahid-create-account.png';

const propTypes = {};
const defaultProps = {};

function UtahIdProcess() {
  return (
    <div className="landing-page-template">
      <div className="home-banner">
        <div className="banner-layer-right" />
        <div className="banner-layer-left">
          <div className="home-banner__title">TURN<br />GPS</div>
        </div>
      </div>
      <div className="content-width">
        <h1 className="my-spacing-l text-center">TurnGPS UtahID Registration Process</h1>

        <p className="lead-in">
          A UtahID is not required to use GPS receivers. However, users who need to enter and manage their subscriptions will be required to do so for security reasons.

          Creating the necessary accounts to access the TurnGPS bill pay system requires one simple step.
        </p>

        <div className="mt-spacing-l">
          <h2 className="my-spacing-l">Get a UtahID Account</h2>

          <p className="lead-in">
            First, you will need to create a UtahID account{' '}
            by going to <ExternalLink href="https://id.utah.gov/create?goto=https://turngps-billpay.ugrc.utah.gov">id.utah.gov</ExternalLink>{' '}
            or by clicking on the &ldquo;UtahID Sign In&rdquo; button in the header.
          </p>
          <p className="lead-in">
            <img src={signInImage} alt="Sign In button example" />
          </p>
          <p className="lead-in">
            Then select the &quot;Create an Account&quot; under the &quot;SIGN IN&quot; button.
          </p>
          <p className="lead-in">
            <img src={utahIdCreateAccountImage} alt="UtahID create account example" />
          </p>
        </div>

      </div>
    </div>
  );
}

UtahIdProcess.propTypes = propTypes;
UtahIdProcess.defaultProps = defaultProps;

export default UtahIdProcess;
