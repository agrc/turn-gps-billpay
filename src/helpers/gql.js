const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
let url = `https://us-central1-${projectId}.cloudfunctions.net/graphQl`;
if (import.meta.env.DEV) {
  url = `http://127.0.0.1:5001/${projectId}/us-central1/graphQl`;
}

export async function checkUsernameUnique(idToken, organization, username) {
  const results = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      query: `
        query checkLoginExists($organization: String, $username: String) {
        checkLoginExists (orgName:$organization, loginName:$username) {
          loginExists
        }
      }`,
      variables: {
        organization,
        username,
      },
    }),
  });
  const isUsernameUnique = await results.json();
  return isUsernameUnique?.data?.checkLoginExists?.loginExists === 0;
}
