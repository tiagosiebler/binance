/* eslint-disable @typescript-eslint/no-unused-vars */
import { neverGuard } from './typeGuards';

function bufferToB64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return globalThis.btoa(binary);
}

export type SignEncodeMethod = 'hex' | 'base64';
export type SignAlgorithm = 'SHA-256' | 'SHA-512';

/**
 * Similar to node crypto's `createHash()` function
 */
// async function hashMessage(
//   message: string,
//   method: SignEncodeMethod,
//   algorithm: SignAlgorithm,
// ): Promise<string> {
//   const encoder = new TextEncoder();

//   const buffer = await globalThis.crypto.subtle.digest(
//     algorithm,
//     encoder.encode(message),
//   );

//   switch (method) {
//     case 'hex': {
//       return Array.from(new Uint8Array(buffer))
//         .map((byte) => byte.toString(16).padStart(2, '0'))
//         .join('');
//     }
//     case 'base64': {
//       return bufferToB64(buffer);
//     }
//     default: {
//       throw neverGuard(method, `Unhandled sign method: "${method}"`);
//     }
//   }
// }

type KeyType = 'HMAC' | 'RSASSA-PKCS1-v1_5' | 'Ed25519';

export function getSignKeyType(secret: string): KeyType {
  if (secret.includes('PRIVATE KEY')) {
    // Sometimes, not always, RSA keys include "RSA" in the header. That's a definite RSA key.
    if (secret.includes('RSA PRIVATE KEY')) {
      return 'RSASSA-PKCS1-v1_5';
    }

    // RSA keys are significantly longer than Ed25519 keys. 150 accounts for length of header & footer
    if (secret.length <= 150) {
      return 'Ed25519';
    }

    return 'RSASSA-PKCS1-v1_5';
  }
  return 'HMAC';
}

async function importKey(
  pem: string,
  type: KeyType,
  algorithm: SignAlgorithm,
  encoder: TextEncoder,
): Promise<CryptoKey> {
  switch (type) {
    case 'Ed25519':
    case 'RSASSA-PKCS1-v1_5': {
      // const prefixRSA = /-----BEGIN RSA PRIVATE KEY-----/;
      // const prefixEd25519 = /-----BEGIN PRIVATE KEY-----/;

      // const suffixRSA = /-----END RSA PRIVATE KEY-----/;
      // const suffixEd25519 = /-----END PRIVATE KEY-----/;

      // const base64Key = pem
      //   .replace(prefixEd25519, '')
      //   .replace(prefixRSA, '')
      //   .replace(suffixEd25519, '')
      //   .replace(suffixRSA, '')
      //   .replace(/\s+/g, ''); // Remove spaces and newlines

      const base64Key = pem.replace(
        /(?:-----BEGIN RSA PRIVATE KEY-----|-----BEGIN PRIVATE KEY-----|-----END RSA PRIVATE KEY-----|-----END PRIVATE KEY-----|\s+)/g,
        '',
      );

      const binaryKey = Uint8Array.from(atob(base64Key), (c) =>
        c.charCodeAt(0),
      );

      return crypto.subtle.importKey(
        'pkcs8',
        binaryKey.buffer,
        { name: type, hash: { name: algorithm } },
        false,
        ['sign'],
      );
    }
    case 'HMAC': {
      return globalThis.crypto.subtle.importKey(
        'raw',
        encoder.encode(pem),
        { name: type, hash: algorithm },
        false,
        ['sign'],
      );
    }
    default: {
      throw neverGuard(type, `Unhandled key type: "${type}"`);
    }
  }
}

/**
 * Sign a message, with a secret, using the Web Crypto API
 *
 * Ed25519 is stable as of v23.5.0, but also not available in all browsers
 */
export async function signMessage(
  message: string,
  secret: string,
  method: SignEncodeMethod,
  algorithm: SignAlgorithm,
  pemEncodeMethod: SignEncodeMethod = method,
): Promise<string> {
  const encoder = new TextEncoder();

  const signKeyType = getSignKeyType(secret);

  const key = await importKey(secret, signKeyType, algorithm, encoder);

  const buffer = await globalThis.crypto.subtle.sign(
    { name: signKeyType },
    key,
    encoder.encode(message),
  );

  switch (method) {
    case 'hex': {
      return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    }
    case 'base64': {
      return bufferToB64(buffer);
    }
    default: {
      throw neverGuard(method, `Unhandled sign method: "${method}"`);
    }
  }
}

export function checkWebCryptoAPISupported() {
  if (!globalThis.crypto) {
    throw new Error(
      `Web Crypto API unavailable. Authentication will not work.

Are you using an old Node.js release? Refer to the current Node.js LTS version. Node.js v18 reached end of life in April 2025! You should be using Node LTS or newer (v22 or above)!
`,
    );
  }
}
