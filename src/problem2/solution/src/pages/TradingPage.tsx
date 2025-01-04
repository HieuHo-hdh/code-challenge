import { Button } from "antd";
import { FC, useContext, useState } from "react";
import UserToken from "../components/UserToken";
import TradingForm from "../components/TradingFormModal";
import { TradingPageContext } from "../context/tradingPageContext.context";

const TradingPage: FC = () => {
  const context = useContext(TradingPageContext);
  const [userToken, setUserToken] = useState(10)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [isLoadingTokens, setIsLoadingTokens] = useState(false)

  const handleOpenExchangeModal = () => {
    if (!isDataFetched) {
      setIsLoadingTokens(true)
      if(context?.fetchData) context?.fetchData()
      setIsLoadingTokens(false)
      setIsDataFetched(true)
    }
    setIsModalOpen(true)
  }

  return <>
    <div className="flex flex-col items-center text-center border-solid border-2 border-primary rounded-lg gap-4 p-6 md:p-8">
      <div className="linear-wipe font-bold m-0 text-3xl leading-none">Hi Trader,</div>
      <UserToken tokenAmount={userToken} handleChangeTokenAmount={setUserToken} />
      <Button type="primary" onClick={() => handleOpenExchangeModal()} loading={isLoadingTokens}>
        Exchange
      </Button>
    </div>
    <TradingForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
  </>
};

export default TradingPage;