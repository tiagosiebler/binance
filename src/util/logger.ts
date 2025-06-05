/* eslint-disable @typescript-eslint/no-unused-vars */

export type LogParams = null | any;

export type DefaultLogger = typeof DefaultLogger;

export const DefaultLogger = {
  /** Ping/pong events and other raw messages that might be noisy. Enable this while troubleshooting. */
  trace: (..._params: LogParams): void => {
    // console.log(_params);
  },
  info: (...params: LogParams): void => {
    console.info(params);
  },
  error: (...params: LogParams): void => {
    console.error(params);
  },
};
