export type LogParams = null | any;

export const DefaultLogger = {
  silly: (...params: LogParams): void => {
    console.log(params);
  },
  debug: (...params: LogParams): void => {
    console.log(params);
  },
  notice: (...params: LogParams): void => {
    console.log(params);
  },
  info: (...params: LogParams): void => {
    console.info(params);
  },
  warning: (...params: LogParams): void => {
    console.error(params);
  },
  error: (...params: LogParams): void => {
    console.error(params);
  }
};
