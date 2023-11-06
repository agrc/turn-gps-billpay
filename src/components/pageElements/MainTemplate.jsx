/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { RefShape } from '@utahdts/utah-design-system';
import { useImmer } from 'use-immer';
import FooterSocialMedia from '../header/FooterSocialMedia';
import FooterMainContent from '../header/FooterMainContent';

const propTypes = {
  content: PropTypes.func.isRequired,
  contentRef: RefShape.isRequired,
  sidePanelLeftContent: PropTypes.element.isRequired,
};
const defaultProps = {};

function MainTemplate({
  content: Content,
  contentRef,
  sidePanelLeftContent,
}) {
  const [state, setState] = useImmer({
    props: ({}),
  });

  return (
    <div>
      <div className="main-template__wrapper">
        <div className="main-template">
          <div className="main-template__side-panel-left">
            {sidePanelLeftContent}
          </div>
          <div className="main-template__right-group">
            <main className="main-template__content" ref={contentRef}>
              <Content state={state} setState={setState} />
            </main>
          </div>
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
MainTemplate.defaultProps = defaultProps;

export default MainTemplate;
