import { Link } from 'react-router-dom';
import { useUser } from 'reactfire';
import pageUrls from '../../enums/pageUrls';

const propTypes = {};
const defaultProps = {};

function HomeSubscriptionButton() {
  const user = useUser();
  const hasUser = !!user.data;

  return hasUser ? (
    <Link
      className="button button--primary-color mr-spacing-xl button--large"
      to={pageUrls.subscription}
    >
      View Subscriptions
    </Link>
  ) : null;
}

HomeSubscriptionButton.propTypes = propTypes;
HomeSubscriptionButton.defaultProps = defaultProps;

export default HomeSubscriptionButton;
