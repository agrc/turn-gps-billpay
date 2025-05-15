import {
  useFirebaseAuth,
  useFirebaseFunctions,
} from '@ugrc/utah-design-system';
import { Button } from '@utahdts/utah-design-system';
import { httpsCallable } from 'firebase/functions';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import SubscriptionTable from './SubscriptionTable';
import pageUrls from '../../enums/pageUrls';
import useAppContext from '../../contexts/AppContext/useAppContext';

function Subscription() {
  const { setAppState } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { functions } = useFirebaseFunctions();
  const getSubscriptions = httpsCallable(functions, 'getSubscriptions');
  const createPayment = httpsCallable(functions, 'createPayment');
  const { currentUser } = useFirebaseAuth();
  const [activeList, setActiveList] = useState([]);
  const [inactiveList, setInactiveList] = useState([]);

  const uid = currentUser?.uid;
  const isUserAvailable = uid?.length > 0;
  const buildActiveList = (arrayList) => {
    if (arrayList?.data?.length) {
      return arrayList.data.filter((subscription) => subscription.activated);
    }
    return null;
  };
  const buildInactiveList = (arrayList) => {
    if (arrayList?.data?.length) {
      return arrayList.data.filter((subscription) => !subscription.activated);
    }
    return null;
  };

  const {
    data: response,
    status: subscriptionStatus,
    isFetching,
  } = useQuery({
    queryKey: ['subscriptions', uid],
    enabled: isUserAvailable,
    queryFn: getSubscriptions,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: (payload) => createPayment(payload),
    onError: (_, __, context) => {
      console.error(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (successData) => {
      window.location.replace(successData.data);
    },
  });

  useEffect(() => {
    const from = location.state?.from?.pathname;
    if (from === '/registration') {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] }).then();
    }
  }, [location.state?.from?.pathname, queryClient]);

  useEffect(() => {
    if (subscriptionStatus === 'success') {
      setActiveList(buildActiveList(response));
      setInactiveList(buildInactiveList(response));
    }
  }, [subscriptionStatus, response]);

  const queryStatus = () => (isFetching ? 'fetching' : subscriptionStatus);

  const goToRegistration = () => {
    setAppState((draftAppState) => {
      draftAppState.hasTermsConditionsAgreed = true;
    });
    navigate(pageUrls.registration);
  };

  return (
    <div className="m-spacing-xl">
      <h1 className="my-spacing-l text-center">TurnGPS Subscription</h1>

      <div className="flex justify-end mb-spacing-l">
        <Button
          appearance="solid"
          color="primary"
          id="addSubscription"
          onClick={goToRegistration}
        >
          Add Subscription
        </Button>
      </div>
      <div className="mt-spacing-xl">
        <div className="flex justify-between items-center">
          <h3 id="table__active-subscriptions">Active Subscriptions</h3>
        </div>
        <SubscriptionTable
          tableData={activeList}
          setTableData={setActiveList}
          lookupStatus={queryStatus()}
          usertype="active"
        />
      </div>

      <div className="mt-spacing-xl">
        <div className="flex justify-between items-center">
          <h3 id="table__active-subscriptions">Pending Subscriptions</h3>
        </div>
        <SubscriptionTable
          tableData={inactiveList}
          setTableData={setInactiveList}
          lookupStatus={queryStatus()}
          type="pending"
        />
      </div>

      <div className="flex justify-end mt-spacing-l mb-spacing-l">
        <Button
          appearance="solid"
          color="primary"
          id="paySubscription"
          isDisabled={!inactiveList?.filter((obj) => obj.activated).length}
          isBusy={mutation.status === 'pending'}
          onClick={() => {
            const filteredList = inactiveList.filter((obj) => obj.activated);
            mutation.mutate(filteredList);
          }}
          iconRight={
            <span
              className="utds-icon-after-external-link"
              aria-hidden="true"
            />
          }
        >
          Pay
        </Button>
      </div>
    </div>
  );
}

export default Subscription;
