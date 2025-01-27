export declare const BEAUTIFIER_EVENT_MAP: {
    aggTrades: {
        a: string;
        p: string;
        q: string;
        f: string;
        l: string;
        T: string;
        m: string;
        M: string;
    };
    bookTickerEvent: {
        e: string;
        u: string;
        s: string;
        b: string;
        B: string;
        a: string;
        A: string;
    };
    klines: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
    };
    bids: {
        0: string;
        1: string;
        2: string;
    }[];
    asks: {
        0: string;
        1: string;
        2: string;
    }[];
    depthUpdateEvent: {
        e: string;
        E: string;
        s: string;
        U: string;
        u: string;
        b: string;
        a: string;
    };
    bidDepthDelta: {
        0: string;
        1: string;
        2: string;
    }[];
    askDepthDelta: {
        0: string;
        1: string;
        2: string;
    }[];
    klineEvent: {
        e: string;
        E: string;
        s: string;
        k: string;
    };
    continuous_klineEvent: {
        e: string;
        E: string;
        ps: string;
        ct: string;
        k: string;
    };
    indexPrice_klineEvent: {
        e: string;
        E: string;
        ps: string;
        k: string;
    };
    kline: {
        t: string;
        T: string;
        s: string;
        i: string;
        f: string;
        L: string;
        o: string;
        c: string;
        h: string;
        l: string;
        v: string;
        n: string;
        x: string;
        q: string;
        V: string;
        Q: string;
        B: string;
    };
    aggTradeEvent: {
        e: string;
        E: string;
        s: string;
        a: string;
        p: string;
        q: string;
        f: string;
        l: string;
        T: string;
        m: string;
        M: string;
    };
    outboundAccountInfoEvent: {
        e: string;
        E: string;
        m: string;
        t: string;
        b: string;
        s: string;
        T: string;
        W: string;
        D: string;
        B: string;
        u: string;
    };
    outboundAccountPositionEvent: {
        e: string;
        E: string;
        u: string;
        B: string;
    };
    balanceUpdateEvent: {
        e: string;
        E: string;
        a: string;
        d: string;
        T: string;
    };
    indexPriceUpdateEvent: {
        e: string;
        E: string;
        i: string;
        p: string;
    };
    listStatusEvent: {
        e: string;
        E: string;
        s: string;
        g: string;
        c: string;
        l: string;
        L: string;
        r: string;
        C: string;
        T: string;
        O: string;
    };
    markPriceUpdateEvent: {
        e: string;
        E: string;
        s: string;
        p: string;
        i: string;
        P: string;
        r: string;
        T: string;
    };
    orders: {
        s: string;
        i: string;
        c: string;
    }[];
    ACCOUNT_UPDATEEvent: {
        e: string;
        E: string;
        T: string;
        a: string;
    };
    MARGIN_CALLEvent: {
        e: string;
        E: string;
        cw: string;
        p: string;
    };
    ORDER_TRADE_UPDATEEvent: {
        e: string;
        E: string;
        T: string;
        o: string;
    };
    CONDITIONAL_ORDER_TRIGGER_REJECTEvent: {
        e: string;
        E: string;
        T: string;
        or: string;
        s: string;
        i: string;
        r: string;
    };
    order: {
        s: string;
        c: string;
        S: string;
        o: string;
        f: string;
        q: string;
        p: string;
        ap: string;
        sp: string;
        x: string;
        X: string;
        i: string;
        l: string;
        z: string;
        L: string;
        N: string;
        n: string;
        T: string;
        t: string;
        b: string;
        a: string;
        m: string;
        R: string;
        wt: string;
        ot: string;
        ps: string;
        cp: string;
        AP: string;
        cr: string;
        rp: string;
        V: string;
        pm: string;
        gtd: string;
    };
    ACCOUNT_CONFIG_UPDATEEvent: {
        e: string;
        E: string;
        T: string;
        ac: string;
        ai: string;
    };
    assetConfiguration: {
        s: string;
        l: string;
    };
    accountConfiguration: {
        j: string;
    };
    positions: {
        s: string;
        ps: string;
        pa: string;
        mt: string;
        iw: string;
        mp: string;
        up: string;
        mm: string;
    }[];
    listenKeyExpiredEvent: {
        e: string;
        E: string;
    };
    updateData: {
        m: string;
        P: string;
        B: string;
    };
    updatedBalances: {
        a: string;
        wb: string;
        cw: string;
        bc: string;
    }[];
    updatedPositions: {
        s: string;
        ma: string;
        pa: string;
        ep: string;
        cr: string;
        up: string;
        mt: string;
        iw: string;
        ps: string;
    }[];
    balances: {
        a: string;
        f: string;
        l: string;
    }[];
    executionReportEvent: {
        e: string;
        E: string;
        s: string;
        c: string;
        S: string;
        o: string;
        f: string;
        q: string;
        p: string;
        P: string;
        F: string;
        g: string;
        C: string;
        x: string;
        X: string;
        r: string;
        i: string;
        l: string;
        z: string;
        L: string;
        n: string;
        N: string;
        T: string;
        t: string;
        I: string;
        w: string;
        m: string;
        M: string;
        O: string;
        Z: string;
        Y: string;
        Q: string;
        W: string;
        V: string;
    };
    tradeEvent: {
        e: string;
        E: string;
        s: string;
        t: string;
        p: string;
        q: string;
        b: string;
        a: string;
        T: string;
        m: string;
        M: string;
    };
    '24hrTickerEvent': {
        e: string;
        E: string;
        s: string;
        p: string;
        P: string;
        w: string;
        x: string;
        c: string;
        Q: string;
        b: string;
        B: string;
        a: string;
        A: string;
        o: string;
        h: string;
        l: string;
        v: string;
        q: string;
        O: string;
        C: string;
        F: string;
        L: string;
        n: string;
    };
    '24hrMiniTickerEvent': {
        e: string;
        E: string;
        s: string;
        ps: string;
        c: string;
        o: string;
        h: string;
        l: string;
        v: string;
        q: string;
    };
    '1hTickerEvent': {
        e: string;
        E: string;
        s: string;
        p: string;
        P: string;
        o: string;
        h: string;
        l: string;
        c: string;
        w: string;
        v: string;
        q: string;
        O: string;
        C: string;
        F: string;
        L: string;
        n: string;
    };
    '4hTickerEvent': {
        e: string;
        E: string;
        s: string;
        p: string;
        P: string;
        o: string;
        h: string;
        l: string;
        c: string;
        w: string;
        v: string;
        q: string;
        O: string;
        C: string;
        F: string;
        L: string;
        n: string;
    };
    '1dTickerEvent': {
        e: string;
        E: string;
        s: string;
        p: string;
        P: string;
        o: string;
        h: string;
        l: string;
        c: string;
        w: string;
        v: string;
        q: string;
        O: string;
        C: string;
        F: string;
        L: string;
        n: string;
    };
    forceOrderEvent: {
        e: string;
        E: string;
        o: string;
    };
    liquidationOrder: {
        s: string;
        S: string;
        o: string;
        f: string;
        q: string;
        p: string;
        ap: string;
        X: string;
        l: string;
        z: string;
        T: string;
    };
    contractInfoEvent: {
        e: string;
        E: string;
        s: string;
        ps: string;
        ct: string;
        dt: string;
        ot: string;
        cs: string;
        bks: string;
    };
    notionalBrackets: {
        bs: string;
        bnf: string;
        bnc: string;
        mmr: string;
        cf: string;
        mi: string;
        ma: string;
    }[];
    GRID_UPDATEEvent: {
        e: string;
        T: string;
        E: string;
        gu: string;
    };
    grid: {
        si: string;
        st: string;
        ss: string;
        s: string;
        r: string;
        up: string;
        uq: string;
        uf: string;
        mp: string;
        ut: string;
    };
    STRATEGY_UPDATEEvent: {
        e: string;
        T: string;
        E: string;
        su: string;
    };
    strategy: {
        si: string;
        st: string;
        ss: string;
        s: string;
        ut: string;
        c: string;
    };
};
