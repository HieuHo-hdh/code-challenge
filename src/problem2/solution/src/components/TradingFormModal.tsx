import { Button, Form, InputNumber, Modal, Select, Tooltip } from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { Token } from "../model/trading.model";
import { TradingPageContext } from "../context/tradingPageContext.context";
import DynamicTokenIcon from "./common/DynamicTokenIcon";
import { ArrowRightOutlined, UnorderedListOutlined } from '@ant-design/icons';
import TokensModal from "./TokensModal";

type TradingFormModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const TradingFormModal: FC<TradingFormModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const context = useContext(TradingPageContext);

  const tokens = useMemo(() => context?.tokens || [], [context?.tokens]);

  const [tradingForm] = Form.useForm();

  const [isShowAllTokensModal, setIsShowAllTokensModal] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchInitialCurrency = Form.useWatch('initialCurrency', tradingForm);
  const watchAmount = Form.useWatch('initialAmount', tradingForm);
  const watchCurrency = Form.useWatch('currency', tradingForm);

  useEffect(() => {
    const handleCalculateAmount = () => { 
      const initialPriceByToken = tokens.find((token: Token) => token.currency === watchInitialCurrency)?.price || 1;
      const priceByToken = tokens.find((token: Token) => token.currency === watchCurrency)?.price || 0;
      return priceByToken/initialPriceByToken * watchAmount;
    }
  
    setCalculatedAmount(handleCalculateAmount())
  }, [watchCurrency, watchAmount, watchInitialCurrency, tokens]);

  useEffect(() => {
    if (isModalOpen)
    tradingForm.setFieldsValue({
      initialAmount: context?.userTokenAmount,
      initialCurrency: context?.userTokenType,
    });
  }, [isModalOpen, context?.userTokenAmount, context?.userTokenType, tradingForm]);

  const handleSelectCurrency = (value: string) => {
    tradingForm.setFieldValue('currency', value);
  }

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      context?.setUserTokenAmount(calculatedAmount);
      context?.setUserTokenType(watchCurrency);
      setIsSubmitting(false);
      tradingForm.resetFields();
      setIsModalOpen(false);
    }, 1000);
  }

  return <>
    <Modal
      title={
        <div className="flex flex-row gap-2 items-center">
          <span>Fancy Form</span>
        </div>
      }
      destroyOnClose
      open={isModalOpen}
      onCancel={() => {
        tradingForm.resetFields();
        setIsModalOpen(false)}
      }
      footer={
        <div className="flex justify-end">
          <Button loading={isSubmitting} type="primary" onClick={() => tradingForm.submit()}>Swap</Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        form={tradingForm} 
        onFinish={handleSubmit}
      >
        <div className="body flex xs:flex-row flex-col items-start xs:items-center justify-between p-4 gap-y-4">
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-semibold text-base xs:text-left text-center">Amount to send</span>
            <Form.Item label="Currency" name="initialCurrency" className="m-0">
              {
                context?.userTokenType ? 
                  <div className="flex-1 flex flex-row gap-2">
                    <DynamicTokenIcon token={context?.userTokenType} />
                    <span>{context?.userTokenType}</span>
                  </div>
                : <></>
              }
            </Form.Item>
            <Form.Item
              label="Amount"
              name="initialAmount"
              rules={[
                {
                  required: true,
                  message: 'Please input the amount!',
                },
                {
                  validator: (_, value) => {
                    return value && context?.userTokenAmount && value > context?.userTokenAmount ? Promise.reject(`Maximum allowed amount is ${context?.userTokenAmount}`) : Promise.resolve() 
                  }
                }
              ]}
              className="m-0"
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>
          <ArrowRightOutlined className="self-center text-base xs:block hidden px-2" />
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-semibold text-base xs:text-left text-center">Amount to receive</span>
            <Form.Item
              label="Swaped currency"
              name="currency"
              className="m-0"
              rules={[
                { 
                  required: true, message: 
                  'Please select a currency!'
                },
                { 
                  validator: (_, value) => {
                    return value && tradingForm?.getFieldValue("initialCurrency") === value ? Promise.reject('Same currency') : Promise.resolve() 
                  }
                }
              ]}
            >
              <Select
                dropdownStyle={{ width: '300px' }}
                suffixIcon={
                  <Tooltip title="Show all tokens">
                    <UnorderedListOutlined onClick={() => setIsShowAllTokensModal(true)}/>
                  </Tooltip>
                }
              >
                {
                  tokens.map((token: Token, index: number) => (
                    <Select.Option value={token.currency} key={`${token.currency}${index}`}>
                      <div className="flex flex-row gap-2 items-center">
                        <DynamicTokenIcon token={token.currency} />
                        <Tooltip title={token.price}><span>{`${token.currency} (${token.price.toFixed(4)})`}</span></Tooltip>
                      </div>
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
            <div className="flex flex-col gap-2">
              <span>Swaped amount</span>
              <span className={`h-8 leading-8 font-semibold ${tradingForm?.getFieldsError()?.some((err) => err?.errors?.length > 0) ? 'text-red-500' : 'text-green-500'}`}>{calculatedAmount}</span>
            </div>
          </div>
        </div>
      </Form>
      <TokensModal isModalOpen={isShowAllTokensModal} setIsModalOpen={setIsShowAllTokensModal} handleSelectCurrency={handleSelectCurrency}/>
    </Modal>
  </>
}

export default TradingFormModal;