import { httpsCallable } from 'firebase/functions';
import { useFunctions, useUser } from 'reactfire';
import { useQuery } from '@tanstack/react-query';

const propTypes = {};
const defaultProps = {};
function Profile() {
  const functions = useFunctions();
  const getProfile = httpsCallable(functions, 'getProfile');
  const { data: user } = useUser();

  // eslint-disable-next-line no-console
  console.log('user', user);

  const uid = user?.uid;
  const isUserAvailable = uid?.length > 0;
  const { data: response } = useQuery({
    queryKey: ['profile', uid],
    enabled: isUserAvailable,
    queryFn: getProfile,
    placeholderData: {
      data: {
        displayName: user?.displayName ?? '',
        email: user?.email ?? '',
        license: '',
      },
    },
    staleTime: Infinity,
  });

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <h2 className="text-3xl font-semibold lg:text-2xl">
        Welcome back, {response?.data?.displayName}
      </h2>
      <span className="relative">
        <svg
          className="absolute bottom-1 right-3 h-6 w-6 fill-current text-slate-800/20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 27 27"
          role="presentation"
          aria-hidden="true"
        >
          <path d="M10.8 2.699v9.45a2.699 2.699 0 005.398 0V5.862a8.101 8.101 0 11-8.423 1.913 2.702 2.702 0 00-3.821-3.821A13.5 13.5 0 1013.499 0 2.699 2.699 0 0010.8 2.699z" />
        </svg>
      </span>
      <div className="flex w-full justify-around">
        My Profile
      </div>
    </div>
  );
}

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default Profile;
