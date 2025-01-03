/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router';
import pageUrls from '../../enums/pageUrls';
import FooterSocialMedia from '../header/FooterSocialMedia';
import FooterMainContent from '../header/FooterMainContent';

function Page404() {
  return (
    <div>
      <main className="landing-page-template page-not-found">
        <div className="top-banner">
          <div className="banner-layer-right" />
        </div>
        <div className="content-width page-not-found__content">
          <div>
            <h1 className="mt-spacing">Page Not Found</h1>
            <br />
            <p>
              You have reached a web address url for which there is no page.
            </p>
            <p>
              If you encountered this error while navigating this site, we would
              love to know how you got here.
              <br />
              Please contact us and let us know your experience!
            </p>
            <p>
              To return to reality you may navigate using the above menu or
              visit the <Link to={pageUrls.home}>home</Link> page.
            </p>
            <p className="mb-aut mb-spacing-lo">
              <Link
                to={pageUrls.home}
                className="button button--primary-color button--solid"
                style={{ display: 'inline-flex' }}
              >
                <span className="button--icon button--icon-left">
                  <span
                    className="utds-icon-before-arrow-left"
                    aria-hidden="true"
                    style={{ fontSize: '.9rem' }}
                  />
                </span>
                Home Page
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer aria-label="Utah Design System (main footer)">
        <FooterSocialMedia />
        <FooterMainContent />
        <div id="utah-footer-placeholder" />
      </footer>
    </div>
  );
}

export default Page404;
