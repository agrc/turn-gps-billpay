import { useFirebaseAuth } from '@ugrc/utah-design-system';

function InfoBanner() {
  const { currentUser, ready } = useFirebaseAuth();

  return ready && !currentUser ? (
    <div className="info-banner m-auto">
      <svg
        className="info-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path
          fillRule="evenodd"
          d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5
                  0 000-13zM0 8a8 8 0 1116 0A8 8 0 010
                  8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0
                  01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0
                  010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0
                  100-2 1 1 0 000 2z"
        />
      </svg>
      You must sign in to UtahID in order to complete the registration.
    </div>
  ) : null;
}

export default InfoBanner;
