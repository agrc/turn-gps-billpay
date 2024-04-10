/* eslint-disable no-return-assign */
import {
  setUtahHeaderSettings,
  sizes,
} from '@utahdts/utah-design-system-header';
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
function actionFunctionForUrl(url, navigate) {
  navigate(url);
}

export const authMenuItems = (hasUser, navigate) =>
  hasUser
    ? {
        actionFunctionUrl: {
          url: pageUrls.subscription,
          actionFunction: () => {
            actionFunctionForUrl(pageUrls.subscription, navigate);
          },
        },
        icon: document.getElementById('home-menu-item-icon-id'),
        title: 'Subscriptions',
      }
    : null;
export const mainMenuItems = (hasUser, navigate) => ({
  menuItems: [
    {
      actionFunctionUrl: {
        url: pageUrls.home,
        actionFunction: () => {
          actionFunctionForUrl(pageUrls.home, navigate);
        },
      },
      icon: document.getElementById('home-menu-item-icon-id'),
      title: 'Home',
    },
    {
      actionFunctionUrl: {
        url: pageUrls.utahIdProcess,
        actionFunction: () => {
          actionFunctionForUrl(pageUrls.utahIdProcess, navigate);
        },
      },
      icon: document.getElementById('home-menu-item-icon-id'),
      title: 'UtahID Registration Process',
    },
    authMenuItems(hasUser, navigate),
    {
      actionFunctionUrl: {
        url: 'http://turngps.utah.gov',
        actionFunction: () => (window.location = 'http://turngps.utah.gov'),
      },
      title: 'turngps.utah.gov',
    },
  ].filter(identity),
  title: 'Main Menu',
});

/** useUtahHeader */
export default function useUtahHeader() {
  const navigate = useNavigate();
  const user = useUser();
  const location = useLocation();
  const signOut = useSignOutFunc();
  const signIn = useSignInFunc();

  const hasUser = !!user.data;

  useEffect(() => {
    setUtahHeaderSettings({
      mainMenu: mainMenuItems(hasUser, navigate),
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
      skipLinkUrl: '.main-template',
      size: sizes.MEDIUM,
      title: 'TURN GPS Bill Pay',
      titleURL: '/',
      utahId: {
        onSignIn: signIn,
        onSignOut: signOut,
        currentUser: hasUser
          ? {
              authenticated: true,
              first: user?.data?.displayName?.split(' ')?.[0] || '',
            }
          : null,
      },
    });
  }, [navigate, hasUser, user, location.pathname, signIn, signOut]);
}
