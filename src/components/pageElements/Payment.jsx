import { useUser } from 'reactfire';

const propTypes = {};
const defaultProps = {};

function Payment() {
  // const functions = useFunctions();
  const { data } = useUser();
  // eslint-disable-next-line no-console
  console.log('userdata', data);

  return (
    <div className="content-width m-auto">
      <h1 className="my-spacing-l text-center">TurnGPS Payment</h1>

      <p className="lead-in">
        Payment Callback
      </p>
    </div>
  );
}

Payment.propTypes = propTypes;
Payment.defaultProps = defaultProps;

export default Payment;
