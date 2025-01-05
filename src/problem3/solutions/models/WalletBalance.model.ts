interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
  usdValue: number;
}
interface Price {
  [key: string]: number;
}

export { WalletBalance, FormattedWalletBalance, Price };