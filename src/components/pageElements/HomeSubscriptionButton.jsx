import { Link } from 'react-router';
import { useFirebaseAuth } from '@ugrc/utah-design-system';
import pageUrls from '../../enums/pageUrls';

function HomeSubscriptionButton() {
  const { currentUser, ready } = useFirebaseAuth();

  return ready && currentUser ? (
    <Link
      className="button button--primary-color mr-spacing-xl button--large"
      to={pageUrls.subscription}
    >
      View Subscriptions
    </Link>
  ) : null;
}

export default HomeSubscriptionButton;
