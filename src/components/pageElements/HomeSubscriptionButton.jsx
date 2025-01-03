import { Link } from 'react-router';
import { useUser } from 'reactfire';
import pageUrls from '../../enums/pageUrls';

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

export default HomeSubscriptionButton;
