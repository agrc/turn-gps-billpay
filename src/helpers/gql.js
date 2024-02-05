const url = 'http://127.0.0.1:5001/ut-dts-agrc-turn-gps-dev/us-central1/graphQl';

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
