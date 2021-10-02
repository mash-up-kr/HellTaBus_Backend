import {OAuth2Client} from 'google-auth-library';

const verifyGoogle = (() => {
  const client =
    new OAuth2Client('383297131309-1sjph4ma4g0d8qr6qnmb2accd0c6qipi.apps.googleusercontent.com');

  return async (token) => {
    const ticket = await client.verifyIdToken({
      idToken: token,
    });
    return ticket.getPayload();
  };
})();

export default verifyGoogle;
