import { constants, createHmac, createSign, sign } from 'crypto';

import * as browserMethods from './webCryptoAPI';
import { SignAlgorithm, SignEncodeMethod } from './webCryptoAPI';

export async function signMessage(
  message: string,
  secret: string,
  method: SignEncodeMethod,
  algorithm: SignAlgorithm,
  pemEncodeMethod: SignEncodeMethod = method,
): Promise<string> {
  if (secret.includes('PRIVATE KEY') && typeof createSign === 'function') {
    if (secret.includes('RSA PRIVATE KEY')) {
      // TODO: test me
      return createSign('RSA-SHA256')
        .update(message)
        .sign(secret, pemEncodeMethod);
    }

    // fallback to ed25519, if a private key is provided but missing "RSA"
    return sign(null, Buffer.from(message), {
      key: secret,
      padding: constants.RSA_PKCS1_PSS_PADDING,
      saltLength: constants.RSA_PSS_SALTLEN_DIGEST,
    }).toString(pemEncodeMethod);
  }

  if (typeof createHmac === 'function') {
    return createHmac('sha256', secret).update(message).digest(method);
  }

  return browserMethods.signMessage(message, secret, method, algorithm);
}
