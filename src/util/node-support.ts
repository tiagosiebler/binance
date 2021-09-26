import { createHmac } from 'crypto';
import * as browserMethods from './browser-support';

export async function signMessage(message: string, secret: string): Promise<string> {
  if (typeof createHmac === 'function') {
    return createHmac('sha256', secret)
    .update(message)
    .digest('hex');
  }

  return browserMethods.signMessage(message, secret);
};
