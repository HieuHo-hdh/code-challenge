import WalletRow from "./components/WalletRow";
import usePrices from "./hooks/usePrices";
import useWalletBalances from "./hooks/useWalletBalances";
import { BoxProps } from "./models/Box.model";
import { WalletBalance, FormattedWalletBalance, Price } from "./models/WalletBalance.model";
import React, { FC, useMemo } from "react";
import { getPriority } from "./utils/getPriority";

interface WalletPageProps extends BoxProps {
  // Add additional props here
  classes?: {
    row?: string;
  }
}

const WalletPage: FC<WalletPageProps> = (props: WalletPageProps) => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices: Price[] = usePrices();

  const sortedBalances = useMemo(() => {
    if (!(balances && Array.isArray(balances))) return []

    return balances?.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
      return balancePriority > -99 && balance.amount <= 0
		})?.sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  } else return 0;
    })?.map((balance: WalletBalance) => {
      const price = prices?.[balance.currency] || 0;
      const usdValue = price * balance.amount;
      return {
        ...balance,
        usdValue: usdValue,
        formatted: balance.amount.toFixed()
      }
    }) || [];
  }, [balances, prices]);

  const rows = useMemo(() => sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    return (
      <WalletRow
        className={props?.classes?.row}
        key={index}
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    )
  }), [sortedBalances]);

  return (
    <>
      {rows}
    </>
  )
}

export default WalletPage;