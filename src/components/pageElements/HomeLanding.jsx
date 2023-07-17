/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import { ExternalLink, Icons } from '@utahdts/utah-design-system';
// import pageUrls from '../routing/pageUrls';
// import ProgressLog from './ProgressLog/ProgressLog';
import IconsWebsite from './IconsWebsite';

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

        <h2 className="text-center mb-spacing-l">About this Network</h2>
      </div>

      <div className='home-page__benefits-section'>
        <div className='home-page__card-grid'>
          <div className='home-page__card home-page__card-narrow'>
            <div className='home-page__card-title'>
              <Icons.IconCheck />
              <h3>Statewide GPS Network</h3>
            </div>
            <p>
              TURN GPS is a statewide network of permanently located GPS receivers, which provides both real time corrections and data for post processing to those that have an active subscription.
            </p>
            <hr />
            <ul>
              <li>Current cost is $600 for each User Login and is good for a full year.</li>
              <li>The Coordinate Reference Frame for this network is NAD83(2011)(EPOCH:2010.0000.)</li>
              <li>Connections: IP address - 168.179.231.9 Port - 2101</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-width">
        <h2 className="text-center mb-spacing-l">Connections from the Source Table</h2>
      </div>
      
      <div className="home-page__benefits-section">
        <div className="home-page__card-grid">
          <div className="home-page__card home-page__card-wide">
            <div className="home-page__card-title">
              <IconsWebsite.IconCollaboration />
              <h3>Trimble users</h3>
            </div>
            <ul>
              <li>VRSCMRX works with the newest Trimble units, newest firmware.</li>
              <li>VRSCMRP works with Trimble units that are newer
                <ul>
                  <li>may not have the latest updates to the firmware.</li>
                </ul>
              </li>
              <li>VRSCMR works with older Trimble units.</li>
            </ul>
          </div>
          <div className="home-page__card home-page__card-wide">
            <div className="home-page__card-title">
              <IconsWebsite.IconA11y />
              <h3>Non-Trimble users</h3>
            </div>
            <ul>
              <li>VRSRTCM32 works with newest non-Trimble units.</li>
              <li>VRSRTCM31 works with non-Trimble units.</li>
              <li>VRSRTCM23 works with older non-Trimble units.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="home-page__gray-section home-page__contact-section mt-spacing-xl">
        <div className="content-width">
          <IconsWebsite.IconChatBubbles />
          <h2 className="text-center mt-spacing-l">Registration Questions</h2>
          <p>
             <a href="mailto:sfernandez@utah.gov,mheagin@utah.gov">Contact us</a>.
          </p>
          <p>
            <ExternalLink href="http://gis.utah.gov/gps">http://gis.utah.gov/gps</ExternalLink>
          </p>
        </div>
      </div>

    </div>
  );
}

HomeLanding.propTypes = propTypes;
HomeLanding.defaultProps = defaultProps;

export default HomeLanding;
