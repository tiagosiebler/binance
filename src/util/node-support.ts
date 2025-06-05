import { constants, createHmac, createSign, sign } from 'crypto';

import * as webCrypto from './webCryptoAPI';
import { SignAlgorithm, SignEncodeMethod } from './webCryptoAPI';

export async function signMessage(
  message: string,
  secret: string,
  method: SignEncodeMethod,
  algorithm: SignAlgorithm,
  pemEncodeMethod: SignEncodeMethod = method,
): Promise<string> {
  const signType = webCrypto.getSignKeyType(secret);

  if (secret.includes('PRIVATE KEY') && typeof createSign === 'function') {
    if (signType === 'RSASSA-PKCS1-v1_5') {
      return createSign('RSA-SHA256')
        .update(message)
        .sign(secret, pemEncodeMethod);
    }

    // fallback to ed25519
    // ed25519 requires b64 encoding
    const ed25519Method: SignEncodeMethod = 'base64';

    return sign(null, Buffer.from(message), {
      key: secret,
      padding: constants.RSA_PKCS1_PSS_PADDING,
      saltLength: constants.RSA_PSS_SALTLEN_DIGEST,
    }).toString(ed25519Method);
  }

  // fallback to hmac
  if (typeof createHmac === 'function') {
    return createHmac('sha256', secret).update(message).digest(method);
  }

  // fallback to web crypto api methods
  return webCrypto.signMessage(message, secret, method, algorithm);
}
