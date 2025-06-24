import crypto from 'crypto';
import https from 'https';
import { ConnectionOptions } from 'tls';

import { MainClient } from '../src/index';
import { getTestProxy } from './proxy.util';
import { notAuthenticatedError } from './response.util';

// Expected pinned public key (SPKI SHA-256 hash)
// You can extract it from the certificate using openssl:
// openssl s_client -connect api.binance.com:443 </dev/null 2>/dev/null | openssl x509 -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | base64
const PINNED_PUBLIC_KEY = '8f+yoE6YBsp3ftzgATuaWqQiZna/x30yVX676Ky7lxY=';

// Load the trusted CA certificate (optional but recommended)
// import fs from 'fs';
// const trustedCert = fs.readFileSync('/path/to/certificate.pem');

const certificatePinningConfiguration: ConnectionOptions = {
  // ca: trustedCert, // Ensures only the specific CA is trusted
  checkServerIdentity: (host, cert) => {
    // Verify Subject Alternative Name (SAN)
    if (!cert.subjectaltname.includes('DNS:*.binance.com')) {
      throw new Error(
        `Certificate SAN mismatch: expected "*.binance.com", got ${cert.subjectaltname}`,
      );
    }
    const publicKey = cert.pubkey;
    const publicKeyHash = crypto
      .createHash('sha256')
      .update(publicKey)
      .digest('base64');

    if (publicKeyHash !== PINNED_PUBLIC_KEY) {
      throw new Error(
        `Certificate pinning validation failed: expected ${PINNED_PUBLIC_KEY}, got ${publicKeyHash}`,
      );
    }
    return undefined;
  },
};

describe('Test advanced https agent configuration', () => {
  // Simple positive check for working certificate pinning while keepAlive flag is active
  describe('pinned certificate', () => {
    const api = new MainClient(
      {
        keepAlive: true,
      },
      {
        ...getTestProxy(),
        httpsAgent: new https.Agent({
          rejectUnauthorized: true,
          ...certificatePinningConfiguration,
        }),
      },
    );

    it('should throw for unauthenticated private calls', async () => {
      expect(() => api.getBalances()).rejects.toMatchObject(
        notAuthenticatedError(),
      );
    });

    it('getServerTime() should return number', async () => {
      expect(await api.getServerTime()).toStrictEqual(expect.any(Number));
    });

    it('getSystemStatus()', async () => {
      expect(await api.getSystemStatus()).toMatchObject({
        msg: 'normal',
        status: 0,
      });
    });

    it('testConnectivity()', async () => {
      expect(await api.testConnectivity()).toStrictEqual({});
    });

    it('getExchangeInfo()', async () => {
      expect(await api.getExchangeInfo()).toMatchObject({
        exchangeFilters: expect.any(Array),
        rateLimits: expect.any(Array),
        serverTime: expect.any(Number),
        symbols: expect.any(Array),
        timezone: expect.any(String),
      });
    });
  });

  describe('mismatching pinned certificate', () => {
    const api = new MainClient(
      {
        keepAlive: true,
      },
      {
        ...getTestProxy(),
        httpsAgent: new https.Agent({
          rejectUnauthorized: true,
          checkServerIdentity: (host, cert) => {
            const publicKeyHash = crypto
              .createHash('sha256')
              .update(cert.pubkey)
              .digest('base64');

            const PINNED_PUBLIC_KEY = 'fakePublicKeyHashShouldMismatch==';
            if (publicKeyHash !== PINNED_PUBLIC_KEY) {
              throw new Error(
                `Certificate pinning validation failed: expected ${PINNED_PUBLIC_KEY}, got ${publicKeyHash}`,
              );
              // eslint-disable-next-line no-unreachable
            }

            return undefined;
          },
        }),
      },
    );

    it('getServerTime() should throw since the pinned certificate did not match', async () => {
      expect(api.getServerTime()).rejects.toThrow(expect.any(Object));
    });
  });
});
