import { WsFormattedMessage } from '../types/websockets';
export default class Beautifier {
    private beautificationMap;
    private floatKeys;
    private floatKeysHashMap;
    constructor();
    beautifyValueWithKey(key: string | number, val: unknown): unknown;
    beautifyObjectValues(data: any | any[]): {};
    beautifyArrayValues(data: any[], parentKey?: string | number): any[];
    beautify(data: any, key?: string | number): any;
    beautifyWsMessage(data: any, eventType?: string, isCombined?: boolean): WsFormattedMessage;
}
