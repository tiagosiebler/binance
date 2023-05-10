import Beautifier from '../src/util/beautifier';

describe('Beautifier', () => {
  let beautifier: Beautifier;
  beforeEach(() => {
    beautifier = new Beautifier();
  });

  describe('Websocket Messages', () => {
    describe('spot markets', () => {
      it('should beautify aggTrade events', () => {
        const data = {
          e: 'aggTrade',
          E: 1627993414114,
          s: 'BTCUSDT',
          a: 868283962,
          p: '38346.71000000',
          q: '0.00033800',
          f: 984198730,
          l: 984198730,
          T: 1627993414114,
          m: false,
          M: true,
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: 'aggTrade',
          eventTime: 1627993414114,
          symbol: 'BTCUSDT',
          tradeId: 868283962,
          price: 38346.71,
          quantity: 0.000338,
          firstTradeId: 984198730,
          lastTradeId: 984198730,
          time: 1627993414114,
          maker: false,
          ignored: true,
        });
      });

      it('should beautify kline events', () => {
        const data = {
          e: 'kline',
          E: 1627993846810,
          s: 'BTCUSDT',
          k: {
            t: 1627993800000,
            T: 1627993859999,
            s: 'BTCUSDT',
            i: '1m',
            f: 984204145,
            L: 984204989,
            o: '38231.29000000',
            c: '38183.30000000',
            h: '38289.46000000',
            l: '38173.86000000',
            v: '33.11807500',
            n: 845,
            x: false,
            q: '1266651.10253383',
            V: '16.86697300',
            Q: '645184.61913219',
            B: '0',
          },
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: 'kline',
          eventTime: 1627993846810,
          symbol: 'BTCUSDT',
          kline: {
            startTime: 1627993800000,
            endTime: 1627993859999,
            symbol: 'BTCUSDT',
            interval: '1m',
            firstTradeId: 984204145,
            lastTradeId: 984204989,
            open: 38231.29,
            close: 38183.3,
            high: 38289.46,
            low: 38173.86,
            volume: 33.118075,
            trades: 845,
            final: false,
            quoteVolume: 1266651.10253383,
            volumeActive: 16.866973,
            quoteVolumeActive: 645184.61913219,
            ignored: 0,
          },
        });
      });

      it('should beautify 24hrMiniTicker events', () => {
        const data = {
          e: '24hrMiniTicker',
          E: 1627994248076,
          s: 'BTCUSDT',
          c: '38217.55000000',
          o: '39271.61000000',
          h: '39975.96000000',
          l: '37703.75000000',
          v: '54555.81687900',
          q: '2122507393.62996085',
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: '24hrMiniTicker',
          eventTime: 1627994248076,
          symbol: 'BTCUSDT',
          close: 38217.55,
          open: 39271.61,
          high: 39975.96,
          low: 37703.75,
          baseAssetVolume: 54555.816879,
          quoteAssetVolume: 2122507393.6299608,
        });
      });

      it('should beautify 24hrMiniTicker all symbol events', () => {
        const data = [
          {
            e: '24hrMiniTicker',
            E: 1627994306672,
            s: 'ETHBTC',
            c: '0.06501800',
            o: '0.06576700',
            h: '0.06705000',
            l: '0.06382900',
            v: '156839.07700000',
            q: '10299.90420965',
          },
          {
            e: '24hrMiniTicker',
            E: 1627994306107,
            s: 'BNBBTC',
            c: '0.00839200',
            o: '0.00840100',
            h: '0.00850000',
            l: '0.00834000',
            v: '112382.00000000',
            q: '945.41430656',
          },
          {
            e: '24hrMiniTicker',
            E: 1627994306673,
            s: 'BTCUSDT',
            c: '38212.23000000',
            o: '39306.52000000',
            h: '39975.96000000',
            l: '37703.75000000',
            v: '54532.31780600',
            q: '2121553403.37109243',
          },
        ];

        expect(
          beautifier.beautifyWsMessage(data, '24hrMiniTicker')
        ).toStrictEqual([
          {
            eventType: '24hrMiniTicker',
            eventTime: 1627994306672,
            symbol: 'ETHBTC',
            close: 0.065018,
            open: 0.065767,
            high: 0.06705,
            low: 0.063829,
            baseAssetVolume: 156839.077,
            quoteAssetVolume: 10299.90420965,
          },
          {
            eventType: '24hrMiniTicker',
            eventTime: 1627994306107,
            symbol: 'BNBBTC',
            close: 0.008392,
            open: 0.008401,
            high: 0.0085,
            low: 0.00834,
            baseAssetVolume: 112382,
            quoteAssetVolume: 945.41430656,
          },
          {
            eventType: '24hrMiniTicker',
            eventTime: 1627994306673,
            symbol: 'BTCUSDT',
            close: 38212.23,
            open: 39306.52,
            high: 39975.96,
            low: 37703.75,
            baseAssetVolume: 54532.317806,
            quoteAssetVolume: 2121553403.3710923,
          },
        ]);
      });

      it('should beautify 24hrTicker events', () => {
        const data = {
          e: '24hrTicker',
          E: 1627994384253,
          s: 'BTCUSDT',
          p: '-1054.78000000',
          P: '-2.686',
          w: '38902.78793106',
          x: '39274.76000000',
          c: '38219.99000000',
          Q: '0.00101200',
          b: '38219.99000000',
          B: '1.94645600',
          a: '38220.00000000',
          A: '1.23539400',
          o: '39274.77000000',
          h: '39975.96000000',
          l: '37703.75000000',
          v: '54506.92287400',
          q: '2120471261.34204991',
          O: 1627907984234,
          C: 1627994384234,
          F: 982914985,
          L: 984213577,
          n: 1298593,
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: '24hrTicker',
          eventTime: 1627994384253,
          symbol: 'BTCUSDT',
          priceChange: -1054.78,
          priceChangePercent: -2.686,
          weightedAveragePrice: 38902.78793106,
          previousClose: 39274.76,
          currentClose: 38219.99,
          closeQuantity: 0.001012,
          bestBid: 38219.99,
          bestBidQuantity: 1.946456,
          bestAskPrice: 38220,
          bestAskQuantity: 1.235394,
          open: 39274.77,
          high: 39975.96,
          low: 37703.75,
          baseAssetVolume: 54506.922874,
          quoteAssetVolume: 2120471261.3420498,
          openTime: 1627907984234,
          closeTime: 1627994384234,
          firstTradeId: 982914985,
          lastTradeId: 984213577,
          trades: 1298593,
        });
      });

      it('should beautify 24hrTicker all symbol events', () => {
        const data = [
          {
            e: '24hrTicker',
            E: 1627994408906,
            s: 'UTKBTC',
            p: '0.00000013',
            P: '2.253',
            w: '0.00000595',
            x: '0.00000577',
            c: '0.00000590',
            Q: '8593.00000000',
            b: '0.00000589',
            B: '758.00000000',
            a: '0.00000590',
            A: '970.00000000',
            o: '0.00000577',
            h: '0.00000610',
            l: '0.00000575',
            v: '4838353.00000000',
            q: '28.78631787',
            O: 1627908003242,
            C: 1627994403242,
            F: 4024646,
            L: 4033272,
            n: 8627,
          },
          {
            e: '24hrTicker',
            E: 1627994408834,
            s: 'UTKUSDT',
            p: '-0.00060000',
            P: '-0.265',
            w: '0.23314481',
            x: '0.22690000',
            c: '0.22590000',
            Q: '31545.88000000',
            b: '0.22480000',
            B: '3452.34000000',
            a: '0.22590000',
            A: '2785.09000000',
            o: '0.22650000',
            h: '0.23970000',
            l: '0.22110000',
            v: '35221260.64000000',
            q: '8211654.05509200',
            O: 1627908008833,
            C: 1627994408833,
            F: 8308830,
            L: 8328242,
            n: 19413,
          },
          {
            e: '24hrTicker',
            E: 1627994409083,
            s: 'XVSBTC',
            p: '-0.00001520',
            P: '-2.130',
            w: '0.00070793',
            x: '0.00071340',
            c: '0.00069850',
            Q: '1.58000000',
            b: '0.00069730',
            B: '6.00000000',
            a: '0.00069880',
            A: '56.71000000',
            o: '0.00071370',
            h: '0.00072530',
            l: '0.00068860',
            v: '40016.02000000',
            q: '28.32839274',
            O: 1627908009083,
            C: 1627994409083,
            F: 7524053,
            L: 7530455,
            n: 6403,
          },
        ];

        expect(beautifier.beautifyWsMessage(data, '24hrTicker')).toStrictEqual([
          {
            baseAssetVolume: 4838353,
            bestAskPrice: 5.9e-6,
            bestAskQuantity: 970,
            bestBid: 5.89e-6,
            bestBidQuantity: 758,
            closeQuantity: 8593,
            closeTime: 1627994403242,
            currentClose: 5.9e-6,
            eventTime: 1627994408906,
            eventType: '24hrTicker',
            firstTradeId: 4024646,
            high: 6.1e-6,
            lastTradeId: 4033272,
            low: 5.75e-6,
            open: 5.77e-6,
            openTime: 1627908003242,
            previousClose: 5.77e-6,
            priceChange: 1.3e-7,
            priceChangePercent: 2.253,
            quoteAssetVolume: 28.78631787,
            symbol: 'UTKBTC',
            trades: 8627,
            weightedAveragePrice: 5.95e-6,
          },
          {
            baseAssetVolume: 35221260.64,
            bestAskPrice: 0.2259,
            bestAskQuantity: 2785.09,
            bestBid: 0.2248,
            bestBidQuantity: 3452.34,
            closeQuantity: 31545.88,
            closeTime: 1627994408833,
            currentClose: 0.2259,
            eventTime: 1627994408834,
            eventType: '24hrTicker',
            firstTradeId: 8308830,
            high: 0.2397,
            lastTradeId: 8328242,
            low: 0.2211,
            open: 0.2265,
            openTime: 1627908008833,
            previousClose: 0.2269,
            priceChange: -0.0006,
            priceChangePercent: -0.265,
            quoteAssetVolume: 8211654.055092,
            symbol: 'UTKUSDT',
            trades: 19413,
            weightedAveragePrice: 0.23314481,
          },
          {
            baseAssetVolume: 40016.02,
            bestAskPrice: 0.0006988,
            bestAskQuantity: 56.71,
            bestBid: 0.0006973,
            bestBidQuantity: 6,
            closeQuantity: 1.58,
            closeTime: 1627994409083,
            currentClose: 0.0006985,
            eventTime: 1627994409083,
            eventType: '24hrTicker',
            firstTradeId: 7524053,
            high: 0.0007253,
            lastTradeId: 7530455,
            low: 0.0006886,
            open: 0.0007137,
            openTime: 1627908009083,
            previousClose: 0.0007134,
            priceChange: -1.52e-5,
            priceChangePercent: -2.13,
            quoteAssetVolume: 28.32839274,
            symbol: 'XVSBTC',
            trades: 6403,
            weightedAveragePrice: 0.00070793,
          },
        ]);
      });

      it('should beautify bookTicker events', () => {
        const data = {
          u: 12750097085,
          s: 'BTCUSDT',
          b: '38296.94000000',
          B: '0.71796900',
          a: '38296.95000000',
          A: '0.34349700',
          e: 'bookTicker',
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          updateId: 12750097085,
          symbol: 'BTCUSDT',
          bidPrice: 38296.94,
          bidQty: 0.717969,
          askPrice: 38296.95,
          askQty: 0.343497,
          eventType: 'bookTicker',
        });
      });

      it('should beautify partialBookDepth events', () => {
        const data = {
          lastUpdateId: 12750129092,
          bids: [
            ['38272.32000000', '0.00850000'],
            ['38270.02000000', '0.08895200'],
            ['38270.01000000', '0.00734100'],
            ['38270.00000000', '0.01246300'],
            ['38267.97000000', '0.00052200'],
          ],
          asks: [
            ['38272.33000000', '0.32766000'],
            ['38272.38000000', '0.32922300'],
            ['38272.40000000', '0.28970300'],
            ['38275.68000000', '0.00106700'],
            ['38275.69000000', '0.08593700'],
          ],
          e: 'partialBookDepth',
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          lastUpdateId: 12750129092,
          bids: [
            [38272.32, 0.0085],
            [38270.02, 0.088952],
            [38270.01, 0.007341],
            [38270, 0.012463],
            [38267.97, 0.000522],
          ],
          asks: [
            [38272.33, 0.32766],
            [38272.38, 0.329223],
            [38272.4, 0.289703],
            [38275.68, 0.001067],
            [38275.69, 0.085937],
          ],
          eventType: 'partialBookDepth',
        });
      });

      it('should beautify depthUpdate events', () => {
        const data = {
          e: 'depthUpdate',
          E: 1627994647377,
          s: 'BTCUSDT',
          U: 12750140450,
          u: 12750140682,
          b: [
            ['38325.86000000', '2.38819400'],
            ['38324.50000000', '0.00106600'],
            ['38324.49000000', '0.00000000'],
            ['38324.48000000', '0.35000000'],
          ],
          a: [
            ['38324.48000000', '0.00000000'],
            ['38324.49000000', '0.00000000'],
            ['38325.87000000', '0.00452300'],
            ['38325.88000000', '0.00000000'],
          ],
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: 'depthUpdate',
          eventTime: 1627994647377,
          symbol: 'BTCUSDT',
          firstUpdateId: 12750140450,
          lastUpdateId: 12750140682,
          bidDepthDelta: [
            { price: 38325.86, quantity: 2.388194 },
            { price: 38324.5, quantity: 0.001066 },
            { price: 38324.49, quantity: 0 },
            { price: 38324.48, quantity: 0.35 },
          ],
          askDepthDelta: [
            { price: 38324.48, quantity: 0 },
            { price: 38324.49, quantity: 0 },
            { price: 38325.87, quantity: 0.004523 },
            { price: 38325.88, quantity: 0 },
          ],
        });
      });

      it('should beautify executionReport events', () => {
        const data = {
          e: 'executionReport',
          E: 1627996666867,
          s: '1INCHUSDT',
          c: 'web_1efb8fe046a14c8cb9b354322955249f',
          S: 'BUY',
          o: 'LIMIT',
          f: 'GTC',
          q: '25.00000000',
          p: '1.50000000',
          P: '0.00000000',
          F: '0.00000000',
          g: -1,
          C: 'web_a3d0420cfda744e5a303bcb5c62427a5',
          x: 'CANCELED',
          X: 'CANCELED',
          r: 'NONE',
          i: 357107943,
          l: '0.00000000',
          z: '0.00000000',
          L: '0.00000000',
          n: '0',
          N: null,
          T: 1627996666866,
          t: -1,
          I: 744909634,
          w: false,
          m: false,
          M: false,
          O: 1627996656511,
          Z: '0.00000000',
          Y: '0.00000000',
          Q: '0.00000000',
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: 'executionReport',
          eventTime: 1627996666867,
          symbol: '1INCHUSDT',
          newClientOrderId: 'web_1efb8fe046a14c8cb9b354322955249f',
          side: 'BUY',
          orderType: 'LIMIT',
          cancelType: 'GTC',
          quantity: 25,
          price: 1.5,
          stopPrice: 0,
          icebergQuantity: 0,
          orderListId: -1,
          originalClientOrderId: 'web_a3d0420cfda744e5a303bcb5c62427a5',
          executionType: 'CANCELED',
          orderStatus: 'CANCELED',
          rejectReason: 'NONE',
          orderId: 357107943,
          lastTradeQuantity: 0,
          accumulatedQuantity: 0,
          lastTradePrice: 0,
          commission: 0,
          commissionAsset: null,
          tradeTime: 1627996666866,
          tradeId: -1,
          ignoreThis1: 744909634,
          isOrderOnBook: false,
          isMaker: false,
          ignoreThis2: false,
          orderCreationTime: 1627996656511,
          cummulativeQuoteAssetTransactedQty: 0,
          lastQuoteAssetTransactedQty: 0,
          orderQuoteQty: 0,
        });
      });

      it('should beautify spot outboundAccountPosition events', () => {
        const data = {
          e: 'outboundAccountPosition',
          E: 1627984442064,
          u: 1627984442064,
          B: [
            {
              a: 'BNB',
              f: '0.21811546',
              l: '0.00000000',
            },
            {
              a: 'USDT',
              f: '542.02628447',
              l: '37.50000000',
            },
            {
              a: '1INCH',
              f: '0.00116000',
              l: '0.00000000',
            },
          ],
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: data.e,
          eventTime: data.E,
          lastUpdateTime: data.u,
          balances: [
            {
              asset: 'BNB',
              availableBalance: 0.21811546,
              onOrderBalance: 0,
            },
            {
              asset: 'USDT',
              availableBalance: 542.02628447,
              onOrderBalance: 37.5,
            },
            {
              asset: '1INCH',
              availableBalance: 0.00116,
              onOrderBalance: 0,
            },
          ],
        });
      });

      it('should beautify spot balanceUpdate events', () => {
        const data = {
          e: 'balanceUpdate', //Event Type
          E: 1573200697110, //Event Time
          a: 'BTC', //Asset
          d: '100.00000000', //Balance Delta
          T: 1573200697068, //Clear Time
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: data.e,
          eventTime: data.E,
          asset: data.a,
          balanceDelta: Number(data.d),
          clearTime: data.T,
        });
      });

      it('should beautify spot listStatus events', () => {
        const data = {
          e: 'listStatus', //Event Type
          E: 1564035303637, //Event Time
          s: 'ETHBTC', //Symbol
          g: 2, //OrderListId
          c: 'OCO', //Contingency Type
          l: 'EXEC_STARTED', //List Status Type
          L: 'EXECUTING', //List Order Status
          r: 'NONE', //List Reject Reason
          C: 'F4QN4G8DlFATFlIUQ0cjdD', //List Client Order ID
          T: 1564035303625, //Transaction Time
          O: [
            //An array of objects
            {
              s: 'ETHBTC', //Symbol
              i: 17, // orderId
              c: 'AJYsMjErWJesZvqlJCTUgL', //ClientOrderId
            },
            {
              s: 'ETHBTC',
              i: 18,
              c: 'bfYPSQdLoqAJeNrOr9adzq',
            },
          ],
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: data.e,
          eventTime: data.E,
          symbol: data.s,
          orderListId: data.g,
          contingencyType: data.c,
          listStatusType: data.l,
          listOrderStatus: data.L,
          listRejectReason: data.r,
          listClientOrderId: data.C,
          transactionTime: data.T,
          orders: [
            {
              symbol: data.O[0].s,
              orderId: data.O[0].i,
              clientOrderId: data.O[0].c,
            },
            {
              symbol: data.O[1].s,
              orderId: data.O[1].i,
              clientOrderId: data.O[1].c,
            },
          ],
        });
      });

      it('should beautify USDM futures ACCOUNT_UPDATE events', () => {
        const data = {
          e: 'ACCOUNT_UPDATE',
          T: 1628067033652,
          E: 1628067033658,
          a: {
            B: [
              {
                a: 'USDT',
                wb: '16.35030230',
                cw: '16.35030230',
                bc: '0.00012480',
              },
            ],
            P: [],
            m: 'ADMIN_DEPOSIT',
          },
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventTime: 1628067033658,
          eventType: 'ACCOUNT_UPDATE',
          transactionTime: 1628067033652,
          updateData: {
            updateEventType: 'ADMIN_DEPOSIT',
            updatedBalances: [
              {
                asset: 'USDT',
                balanceChange: 0.0001248,
                crossWalletBalance: 16.3503023,
                walletBalance: 16.3503023,
              },
            ],
            updatedPositions: [],
          },
        });
      });

      it('should beautify USDM futures MARGIN_CALL events', () => {
        const data = {
          e: 'MARGIN_CALL', // Event Type
          E: 1587727187525, // Event Time
          cw: '3.16812045', // Cross Wallet Balance. Only pushed with crossed position margin call
          p: [
            // Position(s) of Margin Call
            {
              s: 'ETHUSDT', // Symbol
              ps: 'LONG', // Position Side
              pa: '1.327', // Position Amount
              mt: 'CROSSED', // Margin Type
              iw: '0', // Isolated Wallet (if isolated position)
              mp: '187.17127', // Mark Price
              up: '-1.166074', // Unrealized PnL
              mm: '1.614445', // Maintenance Margin Required
            },
          ],
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: 'MARGIN_CALL',
          eventTime: 1587727187525,
          crossWalletBalance: Number(data.cw),
          positions: [
            {
              symbol: 'ETHUSDT',
              positionSide: 'LONG',
              positionAmount: Number(data.p[0].pa),
              marginType: 'CROSSED',
              isolatedWalletAmount: Number(data.p[0].iw),
              markPrice: Number(data.p[0].mp),
              unrealisedPnl: Number(data.p[0].up),
              maintenanceMarginRequired: Number(data.p[0].mm),
            },
          ],
        });
      });

      it('should beautify USDM futures ORDER_TRADE_UPDATE events', () => {
        const data = {
          e: 'ORDER_TRADE_UPDATE', // Event Type
          E: 1568879465651, // Event Time
          T: 1568879465650, // Transaction Time
          o: {
            s: 'BTCUSDT', // Symbol
            c: 'TEST', // Client Order Id
            // special client order id:
            // starts with "autoclose-": liquidation order
            // "adl_autoclose": ADL auto close order
            S: 'SELL', // Side
            o: 'TRAILING_STOP_MARKET', // Order Type
            f: 'GTC', // Time in Force
            q: '0.001', // Original Quantity
            p: '0', // Original Price
            ap: '0', // Average Price
            sp: '7103.04', // Stop Price. Please ignore with TRAILING_STOP_MARKET order
            x: 'NEW', // Execution Type
            X: 'NEW', // Order Status
            i: 8886774, // Order Id
            l: '0', // Order Last Filled Quantity
            z: '0', // Order Filled Accumulated Quantity
            L: '0', // Last Filled Price
            N: 'USDT', // Commission Asset, will not push if no commission
            n: '0', // Commission, will not push if no commission
            T: 1568879465651, // Order Trade Time
            t: 0, // Trade Id
            b: '0', // Bids Notional
            a: '9.91', // Ask Notional
            m: false, // Is this trade the maker side?
            R: false, // Is this reduce only
            wt: 'CONTRACT_PRICE', // Stop Price Working Type
            ot: 'TRAILING_STOP_MARKET', // Original Order Type
            ps: 'LONG', // Position Side
            cp: false, // If Close-All, pushed with conditional order
            AP: '7476.89', // Activation Price, only puhed with TRAILING_STOP_MARKET order
            cr: '5.0', // Callback Rate, only puhed with TRAILING_STOP_MARKET order
            rp: '0', // Realized Profit of the trade
          },
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventTime: 1568879465651,
          eventType: 'ORDER_TRADE_UPDATE',
          order: {
            asksNotional: 9.91,
            averagePrice: 0,
            bidsNotional: 0,
            clientOrderId: 'TEST',
            commissionAmount: 0,
            commissionAsset: 'USDT',
            executionType: 'NEW',
            isCloseAll: false,
            isMakerTrade: false,
            isReduceOnly: false,
            lastFilledPrice: 0,
            lastFilledQuantity: 0,
            orderFilledAccumulatedQuantity: 0,
            orderId: 8886774,
            orderSide: 'SELL',
            orderStatus: 'NEW',
            orderTradeTime: 1568879465651,
            orderType: 'TRAILING_STOP_MARKET',
            originalOrderType: 'TRAILING_STOP_MARKET',
            originalPrice: 0,
            originalQuantity: 0.001,
            positionSide: 'LONG',
            realisedProfit: 0,
            stopPrice: 7103.04,
            stopPriceWorkingType: 'CONTRACT_PRICE',
            symbol: 'BTCUSDT',
            timeInForce: 'GTC',
            tradeId: 0,
            trailingStopActivationPrice: 7476.89,
            trailingStopCallbackRate: 5,
          },
          transactionTime: 1568879465650,
        });
      });

      it('should beautify USDM futures ACCOUNT_CONFIG_UPDATE events', () => {
        const data = {
          e: 'ACCOUNT_CONFIG_UPDATE', // Event Type
          E: 1611646737479, // Event Time
          T: 1611646737476, // Transaction Time
          ac: {
            s: 'BTCUSDT', // symbol
            l: 25, // leverage
          },
          ai: {
            j: true,
          },
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: 'ACCOUNT_CONFIG_UPDATE',
          eventTime: data.E,
          transactionTime: data.T,
          assetConfiguration: {
            symbol: 'BTCUSDT',
            leverage: 25,
          },
          accountConfiguration: {
            isMultiAssetsMode: true,
          },
        });
      });

      it('should include unrecognised properties as is', () => {
        const data = {
          e: 'ACCOUNT_CONFIG_UPDATE', // Event Type
          E: 1611646737479, // Event Time
          T: 1611646737476, // Transaction Time
          ac: {
            s: 'BTCUSDT', // symbol
            l: 25, // leverage
          },
          ai: {
            j: true,
            diffProp: 55, // this value was not expected by the beautifier and shoudl be left in touched
          },
          unkn: true, // this value was not expected by the beautifier and shoudl be left in touched
        };

        expect(beautifier.beautifyWsMessage(data, data.e)).toStrictEqual({
          eventType: 'ACCOUNT_CONFIG_UPDATE',
          eventTime: data.E,
          transactionTime: data.T,
          assetConfiguration: {
            symbol: 'BTCUSDT',
            leverage: 25,
          },
          accountConfiguration: {
            isMultiAssetsMode: true,
            diffProp: 55,
          },
          unkn: true,
        });
      });
    });

    describe('REST Responses', () => {
      it('should beautify spot getAvgPrice responses', () => {
        const data = { mins: 5, price: '45896.03333227' };
        expect(beautifier.beautify(data, 'api/v3/avgPrice')).toStrictEqual({
          mins: 5,
          price: 45896.03333227,
        });
      });
    });
  });
});
