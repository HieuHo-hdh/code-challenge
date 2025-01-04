import { Button, InputNumber, message } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import { TradingPageContext } from "../context/tradingPageContext.context";


const UserToken: FC = () => {
  const context  = useContext(TradingPageContext);
  const [editting, setEditting] = useState<boolean>(false)
  const [newTokenAmount, setNewTokenAmount] = useState<number | null>(context?.userTokenAmount || 0)

  const handleCloseEdit = (): void => {
    setEditting(false)
    setNewTokenAmount(context?.userTokenAmount || 0)
  }

  const handleSaveEdit = (): void => {
    if (newTokenAmount !== null) {
      setEditting(false)
      if (context?.setUserTokenAmount) context.setUserTokenAmount(newTokenAmount as number)
    }
    else message.error('Please input a valid number')
  }

  useEffect(() => {
    if (editting) {
      setNewTokenAmount(context?.userTokenAmount || 0)
    }
  }, [editting, context?.userTokenAmount])

  return <div className={`flex ${editting && 'flex-col'} md:flex-row gap-2 items-center`}>
    <span className="font-light m-0 text-lg leading-[normal]">You are having {!editting && `${context?.userTokenAmount || 0} ${context?.userTokenType || 'tokens'}`}</span>
    { 
      !editting ? 
        <Button type="primary" onClick={(): void => setEditting(true)} icon={<EditOutlined />}/> 
      : <>

        <div className="flex flex-row gap-2">
        <InputNumber
          min={0}
          value={newTokenAmount}
          onChange={(value: number | null): void => setNewTokenAmount(value)}
          onPressEnter={(): void => {
            handleSaveEdit()
          }}
        />
        <Button
          type="primary"
          className="bg-green-400 border-green-400"
          onClick={(): void => handleSaveEdit()}
          icon={<CheckOutlined />} 
        />
        <Button 
          danger
          onClick={(): void => handleCloseEdit()}
          icon={<CloseOutlined />}
        />
        </div>
        <span>{context?.userTokenType || 'tokens'}</span>
      </>
    }
  </div>

}

export default UserToken;