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
