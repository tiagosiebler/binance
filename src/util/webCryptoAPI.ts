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
    if (secret.includes('RSA PRIVATE KEY')) {
      return 'RSASSA-PKCS1-v1_5';
    }

    return 'Ed25519';
  }
  return 'HMAC';
}

// async function importEd25519PrivateKey(
//   pem: string,
//   algorithm: SignAlgorithm,
// ): Promise<CryptoKey> {
//   const base64Key = pem
//     .replace(/-----BEGIN PRIVATE KEY-----/, '')
//     .replace(/-----END PRIVATE KEY-----/, '')
//     .replace(/\s+/g, ''); // Remove spaces and newlines

//   const binaryKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));

//   return crypto.subtle.importKey(
//     'pkcs8',
//     binaryKey.buffer,
//     { name: 'Ed25519', hash: { name: algorithm } },
//     false,
//     ['sign'],
//   );
// }

// async function importRSAPrivateKey(
//   pem: string,
//   algorithm: SignAlgorithm,
// ): Promise<CryptoKey> {
//   const base64Key = pem
//     .replace(/-----BEGIN RSA PRIVATE KEY-----/, '')
//     .replace(/-----END RSA PRIVATE KEY-----/, '')
//     .replace(/\s+/g, ''); // Remove spaces and newlines

//   const binaryKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));

//   return crypto.subtle.importKey(
//     'pkcs8',
//     binaryKey.buffer,
//     { name: 'RSASSA-PKCS1-v1_5', hash: { name: algorithm } },
//     false,
//     ['sign'],
//   );
// }

async function importKey(
  pem: string,
  type: KeyType,
  algorithm: SignAlgorithm,
  encoder: TextEncoder,
): Promise<CryptoKey> {
  switch (type) {
    case 'Ed25519':
    case 'RSASSA-PKCS1-v1_5': {
      const prefix =
        type === 'Ed25519'
          ? /-----BEGIN PRIVATE KEY-----/
          : /-----BEGIN RSA PRIVATE KEY-----/;

      const suffix =
        type === 'Ed25519'
          ? /-----END PRIVATE KEY-----/
          : /-----END RSA PRIVATE KEY-----/;

      const base64Key = pem
        .replace(prefix, '')
        .replace(suffix, '')
        .replace(/\s+/g, ''); // Remove spaces and newlines

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
