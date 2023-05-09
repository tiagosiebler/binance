export type LogParams = null | any;

export const DefaultLogger = {
  silly: (...params: LogParams): void => {},
  debug: (...params: LogParams): void => {
    console.log(new Date(), params);
  },
  notice: (...params: LogParams): void => {
    console.log(new Date(), params);
  },
  info: (...params: LogParams): void => {
    console.info(new Date(), params);
  },
  warning: (...params: LogParams): void => {
    console.error(new Date(), params);
  },
  error: (...params: LogParams): void => {
    console.error(new Date(), params);
  },
};
