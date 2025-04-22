import { MainClient } from '../../src/index';

// or
// import { MainClient } from 'binance';

// Received after creating a new API key with a self-generated RSA public key on binance

// The self-generated RSA private key, this is never directly given to binance, but used to generate a signature
// Note: this MUST include the "BEGIN PRIVATE KEY" header so the SDK understands this is RSA auth
const ed25519PrivateKey = `
-----BEGIN PRIVATE KEY-----
lkmlkm123lkms1s12s+lkmlkm123lkms1s12s
-----END PRIVATE KEY-----
`;

const ed25519APIKey = 'lkmlkm123lkms1s12slkmlkm123lkms1s12slkmlkm123lkms1s12s';

const client = new MainClient({
  api_key: ed25519APIKey,
  api_secret: ed25519PrivateKey,
  beautifyResponses: true,
});

(async () => {
  try {
    console.log('private api call result: ', await client.getAccountInfo());
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
