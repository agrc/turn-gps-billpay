import { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useUser } from 'reactfire';
import { useCurrentMenuItem, VerticalMenu } from '@utahdts/utah-design-system';

import HomeLanding from '../pageElements/HomeLanding';
import Page404 from '../pageElements/Page404';
import TermsConditions from '../pageElements/TermsConditions';
import MainTemplate from '../pageElements/MainTemplate';
import Registration from '../pageElements/Registration';
import useUtahHeader from '../../hooks/useUtahHeader';
import pageUrls from '../../enums/pageUrls';
import AdminLanding from '../pageElements/AdminLanding';


const propTypes = {};
const defaultProps = {};

export const menuSecondary = {
  header: 'Menu',
  id: 'left-nav-pages',
  menuItems: [
    {
      id: 'pages__system-information',
      title: 'System Information',
      link: pageUrls.home,
      parentLinks: [pageUrls.home]
    },
    {
      id: 'pages__terms-conditions',
      title: 'Terms and Conditions',
      link: pageUrls.termsAndConditions,
      parentLinks: [pageUrls.home]
    },
    {
      id: 'pages__registration',
      title: 'Registration',
      link: pageUrls.registration,
      parentLinks: [pageUrls.home]
    }
  ]
};

function Routing() {
  useUtahHeader();
  const user = useUser();
  const contentRef = useRef();
  const currentMenuItem = useCurrentMenuItem(Object.values(menuSecondary));
  const menu = [menuSecondary];

  return (
    <Routes>
      <Route path={pageUrls.home} element={
        <MainTemplate
          content={HomeLanding}
          contentRef={contentRef}
          sidePanelLeftContent={<VerticalMenu currentMenuItem={currentMenuItem} menus={menu} />}
        />
      } />
      <Route path={pageUrls.termsAndConditions} element={
        <MainTemplate
          content={TermsConditions}
          contentRef={contentRef}
          sidePanelLeftContent={<VerticalMenu currentMenuItem={currentMenuItem} menus={menu} />}
        />
      } />
      <Route path={pageUrls.registration} element={
        <MainTemplate
          content={Registration}
          contentRef={contentRef}
          sidePanelLeftContent={<VerticalMenu currentMenuItem={currentMenuItem} menus={menu} />}
        />
      } />
      {
        user.data
          ? (
            <>
              <Route path={pageUrls.admin} element={<AdminLanding />} />
            </>
           )
           : <Route path='*' element={<Page404 />} />
      }
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}

Routing.propTypes = propTypes;
Routing.defaultProps = defaultProps;

export default Routing;
