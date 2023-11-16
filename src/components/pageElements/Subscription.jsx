import { useFunctions, useUser } from 'reactfire';
import { Button } from '@utahdts/utah-design-system';
import { httpsCallable } from 'firebase/functions';
import { useQuery } from '@tanstack/react-query';
import SubscriptionTable from './SubscriptionTable';

const propTypes = {};
const defaultProps = {};

const stateSymbols = [
  {
    subscriptionId: 1, loginName: 'casey1', email: 'chwardle@utah.gov', additionalEmail: null, effectiveDate: '2023-12-12', expirationDate: '2024-12-12', orderNumber: 'UII Renewal', activated: true,
  },
  {
    subscriptionId: 2, loginName: 'casey2', email: 'chwardle2@utah.gov', additionalEmail: 'chwardle@utah.gov', effectiveDate: '2023-12-12', expirationDate: '2024-12-12', orderNumber: 'UII Renewal', activated: false,
  },
  {
    subscriptionId: 3, loginName: 'casey3', email: 'chwardle3@utah.gov', additionalEmail: 'chwardle@utah.gov', effectiveDate: '2023-12-12', expirationDate: '2024-12-12', orderNumber: 'UII Renewal', activated: false,
  },
];

function Subscription() {
  const functions = useFunctions();
  const createTrimbleUser = httpsCallable(functions, 'createTrimbleUser');
  const { data: user } = useUser();
  // eslint-disable-next-line no-console
  console.log('userdata', user);

  const uid = user?.uid;
  const isUserAvailable = uid?.length > 0;
  const { data: response } = useQuery({
    queryKey: ['email', uid],
    enabled: isUserAvailable,
    queryFn: createTrimbleUser({
      organization: 'agrc',
      username: 'chwardle3',
      password: 'test',
      email: 'chwardle@utah.gov',
    })
      .then((result) => result)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`error: ${JSON.stringify(error)}`);
      }),
    staleTime: Infinity,
  });

  // eslint-disable-next-line no-console
  console.log('response', response);

  return (
    <div>
      <div className="home-banner">
        <div className="home-banner__title">TURN<br />GPS</div>
      </div>
      <div className="content-width">
        <h1 className="my-spacing-l text-center">TurnGPS Subscription</h1>

        <div className="flex justify-end mb-spacing-l">
          <Button
            appearance="solid"
            color="primary"
            id="addSubscription"
            // eslint-disable-next-line no-console
            onClick={() => { console.log('addSubscription clicked'); }}
          >
            Add Subscription
          </Button>
        </div>

        <div className="mt-spacing-xl">
          <div className="flex justify-between items-center">
            <h3 id="table__active-subscriptions">Active Subscriptions</h3>
          </div>
          <SubscriptionTable tableData={stateSymbols} type="active" />
        </div>

        <div className="mt-spacing-xl">
          <div className="flex justify-between items-center">
            <h3 id="table__active-subscriptions">Pending Subscriptions</h3>
          </div>
          <SubscriptionTable tableData={stateSymbols} type="pending" />
        </div>

        <div className="flex justify-end mt-spacing-l mb-spacing-l">
          <Button
            appearance="solid"
            color="primary"
            id="paySubscription"
            // eslint-disable-next-line no-console
            onClick={() => { console.log('paySubscription clicked'); }}
          >
            Pay
          </Button>
        </div>

      </div>
    </div>
  );
}

Subscription.propTypes = propTypes;
Subscription.defaultProps = defaultProps;

export default Subscription;
