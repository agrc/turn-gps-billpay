import { useRef } from 'react';
import { Route, Routes } from 'react-router';
import { useFirebaseAuth } from '@ugrc/utah-design-system';

import HomeLanding from '../pageElements/HomeLanding';
import Page404 from '../pageElements/Page404';
import MainTemplate from '../pageElements/MainTemplate';
import Registration from '../pageElements/Registration';
import useUtahHeader from '../../hooks/useUtahHeader';
import pageUrls from '../../enums/pageUrls';
import AdminLanding from '../pageElements/AdminLanding';
import Subscription from '../pageElements/Subscription';
import UtahIdProcess from '../pageElements/UtahIdProcess';

function Routing() {
  useUtahHeader();
  const { currentUser, ready } = useFirebaseAuth();
  const contentRef = useRef();

  return (
    <Routes>
      <Route
        path={pageUrls.home}
        element={<MainTemplate content={HomeLanding} contentRef={contentRef} />}
      />
      <Route
        path={pageUrls.registration}
        element={
          <MainTemplate content={Registration} contentRef={contentRef} />
        }
      />
      <Route
        path={pageUrls.subscription}
        element={
          <MainTemplate content={Subscription} contentRef={contentRef} />
        }
      />
      <Route
        path={pageUrls.utahIdProcess}
        element={
          <MainTemplate content={UtahIdProcess} contentRef={contentRef} />
        }
      />
      {ready && currentUser ? (
        <Route path={pageUrls.admin} element={<AdminLanding />} />
      ) : (
        <Route path="*" element={<Page404 />} />
      )}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default Routing;
