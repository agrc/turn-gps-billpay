/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
// import pageUrls from '../routing/pageUrls';
// import ProgressLog from './ProgressLog/ProgressLog';
import { Link } from 'react-router-dom';
import pageUrls from '../../enums/pageUrls';
import Profile from './Profile';

const propTypes = {};
const defaultProps = {};

function HomeLanding() {
  return (
    <div>
      <div className="home-banner">
        <div className="home-banner__title">TURN<br />GPS</div>
      </div>
      <div className="content-width">
        <h1 className="my-spacing-l text-center">Welcome to Turn GPS</h1>

        <p className="lead-in">
          This is The Utah Reference Network (TURN GPS) running on the Trimble Pivot Platform
        </p>

        <p className="lead-in">
          GPS users that have equipment capable of connecting to the internet via a cellular modem
          using NTRIP can connect to TurnGPS by creating a UtahlD account and purchasing a 1 year
          subscription.
        </p>

        <p className="lead-in">
          TurnGPS is designed to connect multiple, permanently located GPS receivers in a network
          for a range of precision GPS applications including surveying, engineering, construction,
          and GIS data collection. TurnGPS enables high-accuracy positioning in real time over
          much larger geographic region than standard real time methods, using the internet for
          communication. It maximizes the performance from a network of reference stations and
          eliminates the need to set up a temporary field base for each individual project or post
          processing data, saving you time and money. It is ideal for any application requiring
          reliable, fast, high precision wide area positioning.
        </p>
        <Profile />
        <p className="mb-auto">
          <Link to={pageUrls.termsAndConditions} className="button button--primary-color button--solid" style={{ display: 'inline-flex' }}>
            Next
            <span className="button--icon button--icon-right"><span className="utds-icon-after-arrow-right" aria-hidden="true" style={{ fontSize: '.9rem' }} /></span>
          </Link>
        </p>
      </div>
    </div>
  );
}

HomeLanding.propTypes = propTypes;
HomeLanding.defaultProps = defaultProps;

export default HomeLanding;
