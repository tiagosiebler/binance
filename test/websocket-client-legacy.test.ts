import { createParseRawWsMessageLegacy } from '../src';

describe('websocket-client-legacy', () => {
  it('factory legacy parser should use provided parse function and unwrap data', () => {
    const spy = jest.fn(JSON.parse);
    const parse = createParseRawWsMessageLegacy(spy);
    const raw = JSON.stringify({ data: { ok: true } });
    const result = parse(raw);
    expect(result).toEqual({ ok: true });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('factory legacy parser should unwrap nested stringified data', () => {
    const spy = jest.fn(JSON.parse);
    const parse = createParseRawWsMessageLegacy(spy);
    const nested = JSON.stringify({ event: { x: 1 }, other: 'y' });
    const raw = JSON.stringify({ data: nested });
    const result = parse(raw);
    // since nested is a string, it should be parsed into object and unwrapped
    expect(result).toEqual({ x: 1, other: 'y' });
  });
});
