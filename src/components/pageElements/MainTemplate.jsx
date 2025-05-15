import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';
import FooterSocialMedia from '../header/FooterSocialMedia';
import FooterMainContent from '../header/FooterMainContent';

const propTypes = {
  content: PropTypes.func.isRequired,
  contentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

function MainTemplate({ content: Content, contentRef }) {
  const [state, setState] = useImmer({
    props: {},
  });

  return (
    <div>
      <div className="full-width landing-page-template">
        <div className="full-width">
          <main ref={contentRef}>
            <Content state={state} setState={setState} />
          </main>
        </div>
      </div>
      <footer aria-label="Utah Design System (main footer)">
        <FooterSocialMedia />
        <FooterMainContent />
        <div id="utah-footer-placeholder" />
      </footer>
    </div>
  );
}

MainTemplate.propTypes = propTypes;

export default MainTemplate;
