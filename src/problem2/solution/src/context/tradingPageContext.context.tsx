import { createContext, FC, ReactNode, useState } from "react";
import { handleFetchTokens } from "../apis/tokens";
import { Token } from "../model/trading.model";

type TradingPageContextType = {
  tokens: Token[];
  fetchData: () => void;
  userTokenAmount: number;
  setUserTokenAmount: (value: number) => void;
  userTokenType: string;
  setUserTokenType: (value: string) => void;
}

const TradingPageContext = createContext<TradingPageContextType | undefined>(undefined);

type TradingPageContextProps = {
  children: ReactNode
}

const TradingPageProvider: FC<TradingPageContextProps> = ({ children }) => {
  const [tokens, setTokens] = useState<Token[]>([])
  const [userTokenAmount, setUserTokenAmount] = useState(10)
  const [userTokenType, setUserTokenType] = useState('USD')

  const fetchData = async () => {
    const data = await handleFetchTokens()
    // Handle remove duplicates
    setTokens(data?.filter((token: Token, index: number, self: Token[]) => self?.findIndex((t: Token) => t.currency === token.currency) === index) || [])
  }

  return <TradingPageContext.Provider value={{ tokens, fetchData, userTokenAmount, setUserTokenAmount, userTokenType, setUserTokenType }}>
    {children}
  </TradingPageContext.Provider>
};

export { TradingPageContext, TradingPageProvider };