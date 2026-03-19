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
        aria-label="Email UGRC (opens your email app)"
      >
        <span className="utds-icon-before-mail" aria-hidden="true" />
      </a>
      <a
        href="https://github.com/agrc"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
        aria-label="UGRC GitHub, opens in a new tab"
      >
        {IconsWebsite.IconGitHub()}
      </a>
      <a
        href="https://x.com/MapUtah"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
        aria-label="UGRC X, opens in a new tab"
      >
        {IconsWebsite.IconTwitter()}
      </a>
      <a
        href="https://facebook.com/UtahAGRC"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
        aria-label="UGRC Facebook, opens in a new tab"
      >
        {IconsWebsite.IconFacebook()}
      </a>
      <a
        href="https://instagram.com/ugrc.gis"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
        aria-label="UGRC Instagram, opens in a new tab"
      >
        {IconsWebsite.IconInstagram()}
      </a>
      <a
        href="https://www.youtube.com/@therealUGRC"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
        aria-label="UGRC Youtube, opens in a new tab"
      >
        {IconsWebsite.IconYouTube()}
      </a>
      <a
        href="https://utahgeospatialpodcast.buzzsprout.com/"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
        aria-label="UGRC Podcast, opens in a new tab"
      >
        {IconsWebsite.IconPodcast()}
      </a>
    </FooterSocialMediaBar>
  );
}

export default FooterSocialMedia;
