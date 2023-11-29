import { useUser } from 'reactfire';
import { useNavigate } from 'react-router-dom';
import pageUrls from '../../enums/pageUrls';

const propTypes = {};
const defaultProps = {};

function HomeSubscriptionButton() {
  const user = useUser();
  const navigate = useNavigate();
  const hasUser = !!user.data;

  return (
    hasUser
      ? (
        <>
          <button
            type="button"
            className="button button--primary-color button--solid button--large"
            onClick={() => navigate(pageUrls.subscription)}
            style={{ display: 'inline-flex' }}
          >
            View Subscriptions
          </button>
          <span> OR </span>
        </>
      )
      : null
  );
}

HomeSubscriptionButton.propTypes = propTypes;
HomeSubscriptionButton.defaultProps = defaultProps;

export default HomeSubscriptionButton;
