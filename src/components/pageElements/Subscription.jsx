import { useUser } from 'reactfire';

const propTypes = {};
const defaultProps = {};

function Subscription() {
  const { data } = useUser();
  // eslint-disable-next-line no-console
  console.log('userdata', data);

  return (
    <div>
      <div className="home-banner">
        <div className="home-banner__title">TURN<br />GPS</div>
      </div>
      <div className="content-width">
        <h1 className="my-spacing-l text-center">TurnGPS Subscription</h1>

        <p className="lead-in">
          Subscription stuff
        </p>

      </div>
    </div>
  );
}

Subscription.propTypes = propTypes;
Subscription.defaultProps = defaultProps;

export default Subscription;
