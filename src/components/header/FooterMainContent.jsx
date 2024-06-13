/* eslint-disable react/jsx-one-expression-per-line */

import {
  ExternalLink,
  FooterAgencyInformation,
  FooterAgencyInformationColumn,
} from '@utahdts/utah-design-system';
import '@utahdts/utah-design-system-header/css';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from 'reactfire';
import FooterInformationInfo from './FooterInformationInfo';
import logo from '../../static/images/logo.svg';
import packageJSON from '../../../package.json';
import { mainMenuItems } from '../../hooks/useUtahHeader';

function FooterMainContent() {
  const user = useUser();
  const hasUser = !!user.data;

  return (
    <FooterAgencyInformation>
      <FooterAgencyInformationColumn>
        <FooterInformationInfo
          address={{
            city: 'Taylorsville',
            state: 'UT',
            streetAddress1: '4315 South 2700 West',
            zipCode: '84129',
          }}
          agencyTitleFirstLine="Utah Geospatial Resource Center"
          agencyTitleSecondLine="Department of Government Operations"
          email="ugrc@utah.gov"
          logo={<img src={logo} alt="UGRC" />}
        />
      </FooterAgencyInformationColumn>

      <FooterAgencyInformationColumn>
        <div className="footer-agency-information__column-title">Main Menu</div>
        <ul className="footer-agency-information__menu">
          {mainMenuItems(hasUser, useNavigate())?.menuItems?.map((menuItem) => (
            <li key={`footer-main-menu_${menuItem.title}`}>
              <Link
                to={
                  menuItem.actionFunctionUrl?.url ||
                  menuItem.actionUrl?.url ||
                  '/'
                }
              >
                {menuItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </FooterAgencyInformationColumn>

      <FooterAgencyInformationColumn>
        <div className="footer-agency-information__column-title">
          Helpful Links
        </div>
        <ul className="footer-agency-information__menu">
          <li>
            <ExternalLink href="https://gis.utah.gov/contact/">
              UGRC Contacts
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://gis.utah.gov/about/">
              UGRC Mission
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://gis.utah.gov/about/code/">
              GIS-related Utah Statute
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://gis.utah.gov/documentation/policy/">
              UGRC Policies
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://gis.utah.gov/about/media/">
              UGRC Media Resources
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://gis.utah.gov/contact/visiting/">
              UGRC Directions and Parking
            </ExternalLink>
          </li>
        </ul>
      </FooterAgencyInformationColumn>

      <FooterAgencyInformationColumn>
        Version: {packageJSON.version}
      </FooterAgencyInformationColumn>
    </FooterAgencyInformation>
  );
}

export default FooterMainContent;
