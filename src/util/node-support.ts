import { createHmac } from 'crypto';

export async function signMessage(message: string, secret: string): Promise<string> {
  return createHmac('sha256', secret)
    .update(message)
    .digest('hex');
};
