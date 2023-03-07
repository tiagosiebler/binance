import { createHmac, createSign } from 'crypto';
import * as browserMethods from './browser-support';

export async function signMessage(
  message: string,
  secret: string
): Promise<string> {
  if (secret.includes('PRIVATE KEY') && typeof createSign === 'function') {
    return createSign('RSA-SHA256').update(message).sign(secret, 'base64');
  }

  if (typeof createHmac === 'function') {
    return createHmac('sha256', secret).update(message).digest('hex');
  }

  return browserMethods.signMessage(message, secret);
}
