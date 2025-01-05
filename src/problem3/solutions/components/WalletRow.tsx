import React, { FC } from 'react';

type WalletRowProps = {
  className?: string;
  key: number;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: FC<WalletRowProps> = ({
  className,
  key,
  amount,
  usdValue,
  formattedAmount,
}) => {
  // Implement wallet row here
  return <></>
}

export default WalletRow;