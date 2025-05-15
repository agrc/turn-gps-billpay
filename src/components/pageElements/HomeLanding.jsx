import { useNavigate } from 'react-router';
import { Accordion, Button, ExternalLink } from '@utahdts/utah-design-system';
import pageUrls from '../../enums/pageUrls';
import useAppContext from '../../contexts/AppContext/useAppContext';
import HomeSubscriptionButton from './HomeSubscriptionButton';

function HomeLanding() {
  const { setAppState } = useAppContext();
  const navigate = useNavigate();
  const signAgreement = () => {
    setAppState((draftAppState) => {
      draftAppState.hasTermsConditionsAgreed = true;
    });
    navigate(pageUrls.registration);
  };

  return (
    <div className="landing-page-template">
      <div className="home-banner">
        <div className="banner-layer-right" />
        <div className="banner-layer-left">
          <div className="home-banner__title">
            TURN
            <br />
            GPS
          </div>
        </div>
      </div>
      <div className="content-width mb-spacing-xl">
        <h1 className="my-spacing-l text-center">Welcome to TURN GPS</h1>

        <p className="lead-in">
          This is The Utah Reference Network (TURN GPS) running on the Trimble
          Pivot Platform.
        </p>

        <p className="lead-in">
          GPS users that have equipment capable of connecting to the internet
          via a cellular modem using NTRIP can connect to TURN GPS by creating a
          UtahID account and purchasing a 1 year subscription.
        </p>

        <p className="lead-in">
          TurnGPS is designed to connect multiple, permanently located GPS
          receivers in a network for a range of precision GPS applications
          including surveying, engineering, construction, and GIS data
          collection. TurnGPS enables high-accuracy positioning in real time
          over much larger geographic region than standard real time methods,
          using the internet for communication. It maximizes the performance
          from a network of reference stations and eliminates the need to set up
          a temporary field base for each individual project or post processing
          data, saving you time and money. It is ideal for any application
          requiring reliable, fast, high precision wide area positioning.
        </p>
        <p className="flex justify-center">
          <HomeSubscriptionButton />
        </p>
        <p className="flex justify-center">
          <ExternalLink
            className="button button--primary-color mr-spacing-xl button--large"
            href="https://youtu.be/T4Q2eqrrbXQ"
          >
            Registration Instructions
          </ExternalLink>
          <a
            href="#terms"
            className="button button--primary-color button--solid button--large"
            style={{ display: 'inline-flex' }}
          >
            Start Registration
            <span className="button--icon button--icon-right">
              <span
                className="utds-icon-after-arrow-down"
                aria-hidden="true"
                style={{ fontSize: '.9rem' }}
              />
            </span>
          </a>
        </p>
      </div>
      <div className="home-page__gray-section">
        <div className="content-width mb-spacing-xl">
          <h1 className="my-spacing-l text-center" id="terms">
            Terms And Conditions
          </h1>

          <p className="lead-in">
            Registration and use of the service is contingent on accepting the
            following Terms and Conditions.
            <br />
            By checking the &quot;I Agree&quot; button below, you agree to these
            Terms and Conditions:
          </p>

          <Accordion
            headerContent="View Terms and Conditions"
            headingLevel={3}
            headerClassName="button button--solid"
            className="mb-spacing-l home-page--accordion-small"
            isOpen
          >
            <ol>
              <li>
                The Utah Reference Network GPS (TURN GPS) is a cooperative
                effort involving many partners with the Utah Geospatial Resource
                Center (UGRC). This collaborative partnership has made it
                possible to deliver services at a relatively low cost to users.
                The partners and the UGRC are committed to delivery of reliable
                services through TURN GPS. However, some GPS reference stations
                are located in partnering agencies facilities that may only be
                accessible during regular business hours. The user understands
                and acknowledges that this will limit UGRC&apos;s ability to
                immediately address problems at these facilities outside of
                regular business hours. Users of this service understand and
                acknowledge that support for connecting devices will not be
                provided by the UGRC. Users should seek this support from their
                local vendors.
              </li>
              <li>
                Users of this service are responsible for verifying the accuracy
                of the data logged by their device for their own work. This
                website service is an information tool and users must exercise
                due diligence to verify all information obtained from this site
                through standard surveying and geospatial practices and
                procedures.
              </li>
              <li>
                The corrected GPS data are provided in good faith by UGRC and
                its partners for its information value. Given the inherent
                hazards of electronic communication, users acknowledge and
                understand that there may be omissions or inaccuracies in
                information contained in this website. As a result, it should
                not be used as a substitute for consultation with professional
                and competent advisors. Before making any decision or taking any
                action based on the information contained in this site, you
                should consult a professional who is competent in providing
                professional advice in your area of interest.
              </li>
              <li>
                While the UGRC and its partners have made considerable effort to
                ensure that the information through this service is accurate,
                users agree that they will not hold the UGRC and its partners
                responsible for any errors or omissions, or for the results
                obtained from the use of this information. All information
                contained in this website is provided &quot;as is&quot;, with no
                guarantee of completeness, accuracy, timeliness or the results
                obtained from the use of the information, and without warranty
                of any kind, express or implied, including, but not limited to
                warranties of performance, merchantability and fitness for a
                particular purpose or product safety of any kind. Users
                acknowledge that in no event will the UGRC or its partners be
                liable to you or anyone else for any decision made or action
                taken in reliance on the information contained in this website,
                or for any indirect, consequential, special or similar damages
                including, without limitation, permanent loss or corruption of
                data, physical or emotional suffering or damages of any kind
                whatsoever.
              </li>
              <li>
                Certain links in this website connect to other websites
                maintained by third parties over whom the UGRC and its partners
                have no control. These links are for general guidance on matters
                of interest only. The UGRC and its partners makes no
                representations as to the accuracy or any other aspect of
                information contained in other websites. The provision of these
                links should not be interpreted as constituting any kind of
                endorsement, whether implicit or explicit, of the views and/or
                contents of such other websites.
              </li>
              <li>
                The user acknowledges and agrees that the UGRC and its partners
                reserve the right to change or revise published data and/or
                services on this website at any time without any legal
                consequence or financial liability.
              </li>
            </ol>
          </Accordion>

          <p>
            <b>
              By continuing, I am agreeing to the terms and conditions above.
            </b>
          </p>

          <p className="mb-auto text-center">
            <Button
              className="button--primary-color button--solid button--large"
              type="button"
              style={{ display: 'inline-flex' }}
              onClick={signAgreement}
            >
              I Agree
              <span className="button--icon button--icon-right">
                <span
                  className="utds-icon-after-arrow-right"
                  aria-hidden="true"
                  style={{ fontSize: '.9rem' }}
                />
              </span>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeLanding;
