import { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useUser } from 'reactfire';

import HomeLanding from '../pageElements/HomeLanding';
import Page404 from '../pageElements/Page404';
import MainTemplate from '../pageElements/MainTemplate';
import Registration from '../pageElements/Registration';
import useUtahHeader from '../../hooks/useUtahHeader';
import pageUrls from '../../enums/pageUrls';
import AdminLanding from '../pageElements/AdminLanding';
import Subscription from '../pageElements/Subscription';
import Payment from '../pageElements/Payment';
import UtahIdProcess from '../pageElements/UtahIdProcess';

const propTypes = {};
const defaultProps = {};

function Routing() {
  useUtahHeader();
  const user = useUser();
  const contentRef = useRef();

  return (
    <Routes>
      <Route
        path={pageUrls.home}
        element={(
          <MainTemplate
            content={HomeLanding}
            contentRef={contentRef}
          />
      )}
      />
      <Route
        path={pageUrls.registration}
        element={(
          <MainTemplate
            content={Registration}
            contentRef={contentRef}
          />
      )}
      />
      <Route
        path={pageUrls.subscription}
        element={(
          <MainTemplate
            content={Subscription}
            contentRef={contentRef}
          />
      )}
      />
      <Route
        path={pageUrls.payment}
        element={(
          <MainTemplate
            content={Payment}
            contentRef={contentRef}
          />
      )}
      />
      <Route
        path={pageUrls.utahIdProcess}
        element={(
          <MainTemplate
            content={UtahIdProcess}
            contentRef={contentRef}
          />
      )}
      />
      {
        user.data
          ? (
            <Route path={pageUrls.admin} element={<AdminLanding />} />
          )
          : <Route path="*" element={<Page404 />} />
      }
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

Routing.propTypes = propTypes;
Routing.defaultProps = defaultProps;

export default Routing;
