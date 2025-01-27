export type LogParams = null | any;
export declare const DefaultLogger: {
    silly: (...params: LogParams) => void;
    debug: (...params: LogParams) => void;
    notice: (...params: LogParams) => void;
    info: (...params: LogParams) => void;
    warning: (...params: LogParams) => void;
    error: (...params: LogParams) => void;
};
