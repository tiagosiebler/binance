import { AxiosRequestConfig } from 'axios';

/**
 * Returns an axios & websocket compatible proxy config using brightdata credentials
 */
export function getHttpsProxyAgent(
  host: string,
  port: string | number,
  user: string,
  pass: string,
): AxiosRequestConfig | undefined {
  try {
    // Optional dependency that might be missing
    const { HttpsProxyAgent } = require('https-proxy-agent');

    const url = `https://${user}:${pass}@${host}:${port}`;
    return new HttpsProxyAgent(url);
  } catch (e) {
    const msg = `Failed to prepare https proxy config - proxy agent dependency not installed`;
    console.error(new Date(), msg, e);
    throw new Error(msg);
  }
}

export function getWsProxyAgent(
  host: string,
  port: string | number,
  user: string,
  pass: string,
): any {
  try {
    const { SocksProxyAgent } = require('socks-proxy-agent');
    const url = `socks://${user}:${pass}@${host}:${port}`;
    return new SocksProxyAgent(url);
  } catch (e) {
    const msg = `Failed to prepare WS proxy config - proxy agent dependency not installed`;
    console.error(new Date(), msg, e);
    throw new Error(msg);
  }
}
