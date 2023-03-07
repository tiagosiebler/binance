# RSA Authentication with Binance APIs in Node.js

## Creating RSA Keys

Officially, binance recommends downloading and running a key generator from their repo. Guidance for this can be found on the binance website when trying to add a new RSA API key.

However, the following steps use openssl to create public and private key files.

```bash
# Generate a private key with either 2048 or 4096 bit length
openssl genrsa -out rsa-private-key.pem 4096

# Generate a corresponding public key
openssl rsa -in rsa-private-key.pem -pubout -out rsa-public-key.pem
```

## Using the RSA public key to get an API key from Binance

Once created, keep your **private key** completely secret! The **public** key needs to be provided to binance when creating new API credentials with the "Self-generated" option.

Your public key should look something like this:

```pem
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1uWxxOXZUaX6AeZszf4x
rBsU6axA5ipwxG7VPihVgssphDrrSOD0hZqnBmtF2bvT9ee1U0XOfMn+H+J5SH+1
jgUpfioqH0L+KXl6wmLoPsadgfJz0SiQlFnKTkDXvMmecr6cdMHi2qNEx4CMc68C
obvQ4Voz5qqpDwbohGtJh0p10PB//0Ejcoz0UwrTDq8BGeFmWa9pL/7h2vHtw+QU
UxlnGmt98M8KkKqqvVicMK+IVtng/QlDw9ofG2kQcbBkPRaTjNI+8ULtCDH0sOkZ
nT8PtGm4sEwmWH/dRWtUTWkMnUwCzuo/rWPb7WMprW2pKDTrLjUAr9M161t3Xa6W
JO03K3NOxupy7ilululLY8d/WKWYDOZMvS5bPiPRUoZqlJneC0CT/2q1W6GfWzsT
DCDTpgq/Ao7jTtnME9iadpwvFn0nMtNgJSrFDWPq8vKY9pRcEp/Na5qvIEOQIFnp
/kIDPuMf+LZwO8lGFO3jnndY+62835rm7t6ZNM3NLoNCarvUCEasobgDJHw7x7c1
fW/OxYtLrWGdMpsP0MewgGJZXcT7mvlBjQ+JWLoyIc5rYMIDw9RLWUPnrlRCxvPp
sD9kDX7eaipdoik5yLyMaRvd16Vt9Bck/9pbSHazm41m/nd4KCZeGdsvrAA2beww
zFWQQV9EX6/VLBgbnGTsMe0CAwEAAQ==
-----END PUBLIC KEY-----
```

Submit this in the "Upload public key" form, shown when creating a new API key on binance and choosing the "self-generated" option.

Note: the "-----BEGIN PUBLIC KEY-----" and "-----END PUBLIC KEY-----" header & footer can be included.

After using the public key to create a new API key, you will be given an API Key such as the following:

```
SIHqWcDeRoj6gkOjLjQh1dnV1CD7IgwQTfL4LVa8wu04zNTYVSmJBIHsjQjgwWqt
```

This is the first piece, used as the "apiKey" in the [rest-private-rsa.ts](./rest-private-rsa.ts) example.

## Using the RSA private key for RSA authentication with binance APIs in Node.js

Your private key, if generated with the above steps, should look something like this (but with much more text):

```pem
-----BEGIN RSA PRIVATE KEY-----
uayyi6wFTaNeG1/WCqhrowj2kCx8eB6NDZYl+OS9ZI9WC
q/44iFERNuP0TXvQx8tgvSZXyu4/G618QzKh0Ii1uAATt2upa8dp1uGl2U7EqBE8
p5y4pPzJuwvB3j6LQON20u2Wpbg8PQZACMfKym7lYDO+9MloK/gAQpyeYJzbw92C
YE/ymq4JVjCMCQKCAQEA4/X0I9TO8vT0D0l83o693QA3C09uSZ6j9Obx5UrtDnA9
sMkkRoe+R/vvIpVDzukMEEOmCuxbcdPoniVUKlTooK0Llo6JJ1l8CdFzQsOR97Pe
csB6pxkLLH2qHx05xPBy4PyoB
-----END RSA PRIVATE KEY-----
```

This is your secret, you should never share this with anyone, not even binance! Treat this like a password.

As part of this authentication process, your private key is used to generate a signature (using `RSA-SHA256`). This SDK handles this process automatically for you. RSA authentication is automatically detected if the "api_secret" parameter contains the words "PRIVATE KEY", such as the header shown in the example above:

```pem
-----BEGIN RSA PRIVATE KEY-----
```

From here, simply use the key provided by binance as the `api_key` parameter and your private key (with the header) as the `api_secret` parameter.

Based on the above example, the following would prepare the main REST client using the above credentials:

```typescript
const api_key = `SIHqWcDeRoj6gkOjLjQh1dnV1CD7IgwQTfL4LVa8wu04zNTYVSmJBIHsjQjgwWqt`;
const rsaPrivateKey = `
-----BEGIN RSA PRIVATE KEY-----
uayyi6wFTaNeG1/WCqhrowj2kCx8eB6NDZYl+OS9ZI9WC
q/44iFERNuP0TXvQx8tgvSZXyu4/G618QzKh0Ii1uAATt2upa8dp1uGl2U7EqBE8
p5y4pPzJuwvB3j6LQON20u2Wpbg8PQZACMfKym7lYDO+9MloK/gAQpyeYJzbw92C
YE/ymq4JVjCMCQKCAQEA4/X0I9TO8vT0D0l83o693QA3C09uSZ6j9Obx5UrtDnA9
sMkkRoe+R/vvIpVDzukMEEOmCuxbcdPoniVUKlTooK0Llo6JJ1l8CdFzQsOR97Pe
csB6pxkLLH2qHx05xPBy4PyoB
-----END RSA PRIVATE KEY-----
`;

const client = new MainClient({
  api_key: api_key,
  api_secret: rsaPrivateKey,
  beautifyResponses: true,
});
```

For a complete example, refer to the [rest-private-rsa.ts](./rest-private-rsa.ts) file on GitHub.
