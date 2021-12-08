import { parseRawWsMessage } from "../src/websocket-client";

describe('websocket-client', () => {
  describe('parseRawWsMessage()', () => {
    it('should parse & resolve an event with nested data', () => {
      const event = '{"stream":"!forceOrder@arr","data":{"e":"forceOrder","E":1634653599186,"o":{"s":"IOTXUSDT","S":"SELL","o":"LIMIT","f":"IOC","q":"3661","p":"0.06606","ap":"0.06669","X":"FILLED","l":"962","z":"3661","T":1634653599180}}}';
      const result = parseRawWsMessage(event);
      expect(typeof result).toBe('object');
      expect(result.data).toBe(undefined);
    });
  });
});
