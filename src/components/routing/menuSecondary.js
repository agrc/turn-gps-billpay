import pageUrls from '../../enums/pageUrls';

export const menuSecondary = {
  header: 'Menu',
  id: 'left-nav-pages',
  menuItems: [
    {
      id: 'pages__system-information',
      title: 'System Information',
      link: pageUrls.home,
      parentLinks: [pageUrls.home],
    },
    {
      id: 'pages__terms-conditions',
      title: 'Terms and Conditions',
      link: pageUrls.termsAndConditions,
      parentLinks: [pageUrls.home],
    },
    {
      id: 'pages__registration',
      title: 'Registration',
      link: pageUrls.registration,
      parentLinks: [pageUrls.home],
    },
  ],
};
