// @ts-check
import { FooterSocialMediaBar } from '@utahdts/utah-design-system';
import '@utahdts/utah-design-system-header/css';
import IconsWebsite from '../pageElements/IconsWebsite';

function FooterSocialMedia() {
  return (
    <FooterSocialMediaBar title="Connect with us">
      <a
        href="mailto:ugrc@utah.gov"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        <span className="utds-icon-before-mail" aria-hidden="true" />
        <span className="visually-hidden">Email us, opens in a new tab</span>
      </a>
      <a
        href="https://github.com/agrc"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        {IconsWebsite.IconGitHub()}
        <span className="visually-hidden">UGRC GitHub, opens in a new tab</span>
      </a>
      <a
        href="https://twitter.com/MapUtah"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        {IconsWebsite.IconTwitter()}
        <span className="visually-hidden">
          UGRC Twitter, opens in a new tab
        </span>
      </a>
      <a
        href="https://facebook.com/UtahAGRC"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        {IconsWebsite.IconFacebook()}
        <span className="visually-hidden">
          UGRC Facebook, opens in a new tab
        </span>
      </a>
      <a
        href="https://www.youtube.com/@therealUGRC"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        {IconsWebsite.IconYouTube()}
        <span className="visually-hidden">
          UGRC Youtube, opens in a new tab
        </span>
      </a>
      <a
        href="https://utahgeospatialpodcast.buzzsprout.com/"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        {IconsWebsite.IconPodcast()}
        <span className="visually-hidden">
          UGRC Podcast, opens in a new tab
        </span>
      </a>
    </FooterSocialMediaBar>
  );
}

export default FooterSocialMedia;
