import { MainClient } from '../src/index';

// or
// import { MainClient } from 'binance';

// Received after creating a new API key with a self-generated RSA public key on binance
const api_key =
  'SIHqWcDeRoj6gkOjLjQh1dnV1CD7IgwQTfL4LVa8wu04zNTYVSmJBIHsjQjgwWqt';

// The self-generated RSA private key, this is never directly given to binance, but used to generate a signature
// Note: this MUST include the "BEGIN PRIVATE KEY" header so the SDK understands this is RSA auth
const rsaPrivateKey = `
-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----
`;

const client = new MainClient({
  api_key: api_key,
  api_secret: rsaPrivateKey,
  beautifyResponses: true,
});

(async () => {
  try {
    console.log('private api call result: ', await client.getBalances());
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
