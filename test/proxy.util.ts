/* eslint-disable @typescript-eslint/no-require-imports */
import { AxiosRequestConfig } from 'axios';

export function getTestProxy(): AxiosRequestConfig {
  if (process.env.PROXY_ENABLED !== 'true') {
    return {};
  }
  const host = process.env.PROXY_HOST;
  const port = process.env.PROXY_PORT;
  const user = process.env.PROXY_USER;
  const pass = process.env.PROXY_PASS;
  if (!host || !port || !user || !pass) {
    throw new Error('One or more env vars missing for proxy support');
  }

  console.log('Test proxy enabled...');

  return {
    proxy: {
      host,
      port: Number(port),
      auth: {
        username: user,
        password: pass,
      },
      protocol: 'http',
    },
  };
}

export function getWSTestProxy():
  | { wsOptions?: undefined }
  | { wsOptions: { agent: any } } {
  if (process.env.PROXY_ENABLED !== 'true') {
    return {};
  }
  const host = process.env.PROXY_HOST;
  const port = process.env.PROXY_PORT;
  const user = process.env.PROXY_USER;
  const pass = process.env.PROXY_PASS;
  if (!host || !port || !user || !pass) {
    throw new Error('One or more env vars missing for proxy support');
  }

  console.log('WS Test proxy enabled...');

  return {
    wsOptions: {
      agent: getWsProxyAgent(host, port, user, pass),
    },
  };
}

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
    const msg =
      'Failed to prepare https proxy config - proxy agent dependency not installed';
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
    const msg =
      'Failed to prepare WS proxy config - proxy agent dependency not installed';
    console.error(new Date(), msg, e);
    throw new Error(msg);
  }
}
