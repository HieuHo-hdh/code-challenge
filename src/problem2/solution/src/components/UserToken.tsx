import { Button, InputNumber, message } from "antd";
import { FC, useState } from "react";
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'

type UserTokenProps = {
  tokenAmount: number
  handleChangeTokenAmount: (tokenAmount: number) => void
}

const UserToken: FC<UserTokenProps> = ({ tokenAmount, handleChangeTokenAmount }) => {
  const [editting, setEditting] = useState<boolean>(false)
  const [newTokenAmount, setNewTokenAmount] = useState<number | null>(tokenAmount)

  const handleCloseEdit = (): void => {
    setEditting(false)
    setNewTokenAmount(tokenAmount)
  }

  const handleSaveEdit = (): void => {
    if (newTokenAmount !== null) {
      setEditting(false)
      handleChangeTokenAmount(newTokenAmount as number)
    }
    else message.error('Please input a valid number')
  }

  return <div className={`flex ${editting && 'flex-col'} md:flex-row gap-2 items-center`}>
    <span className="font-light m-0 text-lg leading-[normal]">You are having {!editting && `${tokenAmount} tokens`}</span>
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
          // onPressEnter={(): void => handleSaveEdit()}
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
        <span>tokens</span>
      </>
    }
  </div>

}

export default UserToken;