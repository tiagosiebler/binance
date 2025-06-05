# Ed25519 Authentication with Binance APIs in Node.js

## Creating Ed25519 Keys

Officially, binance recommends downloading and running a key generator from their repo. Guidance for this can be found on the [binance website](https://www.binance.com/en/support/faq/detail/6b9a63f1e3384cf48a2eedb82767a69a) when trying to add a new Ed25519 API key, or in their GitHub repository: https://github.com/binance/asymmetric-key-generator

## Using the Ed25519 public key to get an API key from Binance

Once created, keep your **private key** completely secret! The **public** key needs to be provided to binance when creating new API credentials with the "Self-generated" option.

Your public key should look something like this:

```pem
-----BEGIN PUBLIC KEY-----
lkn123bx123x+7lkmlkn123bx123xAMDO/lkm123x=
-----END PUBLIC KEY-----
```

Submit this in the "Upload public key" form, shown when creating a new API key on binance and choosing the "self-generated" option.

Note: the "-----BEGIN PUBLIC KEY-----" and "-----END PUBLIC KEY-----" header & footer can be included.

After using the public key to create a new API key, you will be given an API Key such as the following:

```
mlk2mx3l12m3lxk1m3lxk1m3l1k2mx3l12km3xl1km23x1l2k3mx1l2km3x
```

This is the first piece, used as the "apiKey" in the [rest-private-ed25519.ts](./rest-private-ed25519.ts) example.

## Using the Ed25519 private key for Ed25519 authentication with binance APIs in Node.js

Your private key, if generated with the above steps, should look something like this (but with much more text):

```pem
-----BEGIN PRIVATE KEY-----
lx1k2m3xl12lkm2l1kmx312312l3mx1lk23m
-----END PRIVATE KEY-----
```

This is your secret, you should **never** share this with anyone, not even binance! Treat this like a password.

As part of this authentication process, your private key is used to generate a signature. This SDK handles this process automatically for you. Ed25519 authentication is automatically detected if the "api_secret" parameter contains the words "PRIVATE KEY", such as the header shown in the example above.

From here, simply use the key provided by binance as the `api_key` parameter and your private key (with the header) as the `api_secret` parameter.

Based on the above example, the following would prepare the main REST client using the above credentials:

```typescript
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
```

The rest is automatic - just continue using the SDK as you would normally. It will automatically handle signing requests using Ed25519 for you.

For a complete example, refer to the [rest-private-ed25519.ts](./rest-private-ed25519.ts) file on GitHub.
