import { createContext, FC, ReactNode, useState } from "react";
import { handleFetchTokens } from "../apis/tokens";
import { Token } from "../model/trading.model";

type TradingPageContextType = {
  tokens: Token[];
  fetchData: () => void;
}

const TradingPageContext = createContext<TradingPageContextType | undefined>(undefined);

type TradingPageContextProps = {
  children: ReactNode
}

const TradingPageProvider: FC<TradingPageContextProps> = ({ children }) => {
  const [tokens, setTokens] = useState<Token[]>([])

  const fetchData = async () => {
    const data = await handleFetchTokens()
    setTokens(data || [])
  }

  return <TradingPageContext.Provider value={{ tokens, fetchData }}>
    {children}
  </TradingPageContext.Provider>
};

export { TradingPageContext, TradingPageProvider };