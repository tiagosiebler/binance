import type { WsRequestOperationBinance } from '../src/types/websockets/ws-api';
import {
  getOrderIdPrefix,
  requiresWSAPINewClientOID,
  validateWSAPINewClientOID,
} from '../src/util/requestUtils';
import { WS_KEY_MAP } from '../src/util/websockets/websocket-util';

type WSAPIRequestWithParams = WsRequestOperationBinance<
  string,
  Record<string, string | number | undefined>
> & {
  params: Record<string, string | number | undefined>;
};

describe('requestUtils', () => {
  describe('WS API new order client IDs', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('generates clientAlgoId for USD-M algo order placement', () => {
      const request: WSAPIRequestWithParams = {
        id: 1,
        method: 'algoOrder.place',
        params: {
          algoType: 'CONDITIONAL',
          symbol: 'ETHUSDT',
          side: 'SELL',
          type: 'STOP_MARKET',
          timestamp: Date.now(),
        },
      };

      expect(requiresWSAPINewClientOID(request, WS_KEY_MAP.usdmWSAPI)).toBe(
        true,
      );

      validateWSAPINewClientOID(request, WS_KEY_MAP.usdmWSAPI);

      expect(request.params.clientAlgoId).toMatch(
        new RegExp(`^x-${getOrderIdPrefix('usdm', 'v1')}`),
      );
      expect(request.params.newClientOrderId).toBeUndefined();
    });

    it('warns but preserves custom USD-M algo order IDs without the SDK prefix', () => {
      const warnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => undefined);
      const request: WSAPIRequestWithParams = {
        id: 1,
        method: 'algoOrder.place',
        params: {
          algoType: 'CONDITIONAL',
          clientAlgoId: 'external-system-id',
          symbol: 'ETHUSDT',
          side: 'SELL',
          type: 'STOP_MARKET',
          timestamp: Date.now(),
        },
      };

      validateWSAPINewClientOID(request, WS_KEY_MAP.usdmWSAPI);

      expect(request.params.clientAlgoId).toBe('external-system-id');
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("'clientAlgoId' invalid"),
      );
    });
  });
});
