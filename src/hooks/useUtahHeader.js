import { setUtahHeaderSettings, sizes } from '@utahdts/utah-design-system-header';
import identity from 'lodash/identity';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from 'reactfire';
import useSignInFunc from './useSignInFunc';
import useSignOutFunc from './useSignOutFunc';
import logo from '../static/images/turn_logo.svg';
import pageUrls from '../enums/pageUrls';

/** @typedef {import ('../mono-repo-globals/@types/jsdoc.d.js').EventAction} EventAction */

/**
 * @param {string} url
 * @param {import('react-router-dom').NavigateFunction} navigate
 * @returns {EventAction}
 */
// function actionFunctionForUrl(url, navigate) {
//   return (
//     (e) => {
//       if (!e.metaKey) {
//         e.preventDefault();
//         e.stopPropagation();
//         navigate(url);
//       }
//     }
//   );
// }

export const mainMenuItems = {
  menuItems: [
    {
      actionUrl: {
        url: pageUrls.home
      },
      icon: document.getElementById('home-menu-item-icon-id'),
      title: 'Home'
    },
    {
      actionFunctionUrl: {
        url: 'http://turngps.utah.gov',
        actionFunction: () => window.location = 'http://turngps.utah.gov'
      },
      title: 'turngps.utah.gov'
    }
  ]
    .filter(identity),
  title: 'Main Menu',
};

/** useUtahHeader */
export default function useUtahHeader() {
  const navigate = useNavigate();
  const user = useUser();
  const location = useLocation();
  const signOut = useSignOutFunc();
  const signIn = useSignInFunc();

  const hasUser = !!user.data;

  useEffect(
    () => {
      setUtahHeaderSettings({
        mainMenu: mainMenuItems,
        footer: {
          showHorizontalRule: true,
          domLocationTarget: {
            cssSelector: '#utah-footer-placeholder',
          },
        },
        logo: { imageUrl: logo },
        mediaSizes: {
          mobile: 640,
          tabletPortrait: 768,
          tabletLandscape: 1024,
        },
        showTitle: true,
        size: sizes.MEDIUM,
        title: 'TURN GPS Bill Pay',
        titleURL: '/',
        utahId: {
          onSignIn: signIn,
          onSignOut: signOut,
          currentUser: (
            hasUser
              ? {
                authenticated: true,
                first: user?.data?.displayName?.split(' ')?.[0] || '',
              }
              : null
          ),
        },
      });
    },
    [navigate, hasUser, user, location.pathname, signIn, signOut]
  );
}
