// @ts-check
// @ts-ignore
// eslint-disable-next-line
import {
  FooterSocialMediaBar,
  Icons,
} from '@utahdts/utah-design-system';
import '@utahdts/utah-design-system-header/css';
import '@utahdts/utah-design-system/css/3-generic/normalize.css';
import IconsWebsite from '../pageElements/IconsWebsite';


const propTypes = {};
const defaultProps = {};

function FooterSocialMedia() {
  return (
    <FooterSocialMediaBar title="Connect with us">
      <a
        href="mailto:ugrc@utah.gov"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        {Icons.IconEnvelope()}
        <span className="visually-hidden">Email us, opens in a new tab</span>
      </a>
      <a
        href="https://github.com/agrc"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        {Icons.IconGitHub()}
        <span className="visually-hidden">UGRC GitHub, opens in a new tab</span>
      </a>
      <a
        href="https://twitter.com/MapUtah"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        {IconsWebsite.IconTwitter()}
        <span className="visually-hidden">UGRC Twitter, opens in a new tab</span>
      </a>
      <a
        href="https://facebook.com/UtahAGRC"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        {IconsWebsite.IconFacebook()}
        <span className="visually-hidden">UGRC Facebook, opens in a new tab</span>
      </a>
      <a
        href="https://vimeo.com/utahagrc"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        {IconsWebsite.IconVimeo()}
        <span className="visually-hidden">UGRC Vimeo, opens in a new tab</span>
      </a>
      <a
        href="https://utahgeospatialpodcast.buzzsprout.com/"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        {IconsWebsite.IconPodcast()}
        <span className="visually-hidden">UGRC Podcast, opens in a new tab</span>
      </a>
    </FooterSocialMediaBar>
  );
}

FooterSocialMedia.propTypes = propTypes;
FooterSocialMedia.defaultProps = defaultProps;

export default FooterSocialMedia;