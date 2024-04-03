export interface SimpleEarnProductListParams {
  asset?: string;
  current?: number;
  size?: number;
}

export interface SimpleEarnFlexibleProduct {
  asset: string;
  latestAnnualInterestRate: string;
  tierAnnualPercentageRate: Record<string, number>;
  airDropPercentageRate: string;
  canPurchase: boolean;
  canRedeem: boolean;
  isSoldOut: boolean;
  hot: boolean;
  minPurchaseAmount: string;
  productId: string;
  subscriptionStartTime: number;
  status: string;
}

export interface SimpleEarnFlexibleProductListResponse {
  rows: SimpleEarnFlexibleProduct[];
  total: number;
}

export interface SimpleEarnLockedProduct {
  projectId: string;
  detail: {
    asset: string;
    rewardAsset: string;
    duration: number;
    renewable: boolean;
    isSoldOut: boolean;
    apr: string;
    status: string;
    subscriptionStartTime: number;
    extraRewardAsset: string;
    extraRewardAPR: string;
  };
  quota: {
    totalPersonalQuota: string;
    minimum: string;
  };
}

export interface SimpleEarnLockedProductListResponse {
  rows: SimpleEarnLockedProduct[];
  total: number;
}

export interface SimpleEarnSubscribeProductParams {
  productId: string;
  amount: number;
  autoSubscribe?: boolean;
  sourceAccount?: 'SPOT' | 'FUND' | 'ALL';
}

export interface SimpleEarnSubscribeFlexibleProductResponse {
  purchaseId: string;
  success: boolean;
}

export interface SimpleEarnSubscribeLockedProductResponse {
  purchaseId: string;
  positionId: string;
  success: boolean;
}

export interface SimpleEarnRedeemParams {
  positionId: string;
}

export interface SimpleEarnRedeemResponse {
  success: boolean;
  redeemId: string;
}

export interface SimpleEarnFlexibleProductPositionParams {
  asset?: string;
  productId?: string;
  current?: number;
  size?: number;
}

export interface SimpleEarnLockedProductPositionParams
  extends SimpleEarnFlexibleProductPositionParams {
  positionId?: string;
}

export interface SimpleEarnLockedProductPosition {
  positionId: string;
  projectId: string;
  asset: string;
  amount: string;
  purchaseTime: string;
  duration: string;
  accrualDays: string;
  rewardAsset: string;
  APY: string;
  isRenewable: boolean;
  isAutoRenew: boolean;
  redeemDate: string;
}

export interface SimpleEarnLockedProductPositionResponse {
  rows: SimpleEarnLockedProductPosition[];
  total: number;
}

export interface SimpleEarnAccountResponse {
  totalAmountInBTC: string;
  totalAmountInUSDT: string;
  totalFlexibleAmountInBTC: string;
  totalFlexibleAmountInUSDT: string;
  totalLockedinBTC: string;
  totalLockedinUSDT: string;
}
