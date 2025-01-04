import { Modal, Table } from "antd";
import { FC, useContext } from "react";
import { Token } from "../model/trading.model";
import { TradingPageContext } from "../context/tradingPageContext.context";
import DynamicTokenIcon from "./common/DynamicTokenIcon";

type TradingFormModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const TradingFormModal: FC<TradingFormModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const context = useContext(TradingPageContext);
  const tokens = context?.tokens || []

  // const getImage = async (image: string) => {
  //   const importedSrc = await importImage(image)
  //   console.log('importedSrc:', importedSrc)
  //   return importedSrc
  // }
  // console.log('useImportImage:', importImage('USD'), getImage('USD'))
  const component = DynamicTokenIcon({ token: 'USD' })
  console.log('----component---', component)
  return <Modal
    title="Exchange currency"
    open={isModalOpen}
    onCancel={() => setIsModalOpen(false)}
  >
    <Table 
      dataSource={tokens}
      showHeader
      columns={[
        { 
          title: 'Currency',
          dataIndex: 'currency',
          width: '100px',
          key: 'currency', 
          filterMode: 'menu',
          filters: tokens
            .filter((token: Token, index: number, self: Token[]) => self.findIndex((t: Token) => t.currency === token.currency) === index)
            .map((token: Token) => ({ text: token.currency, value: token.currency })),
          onFilter: (value, record) => {
            return  record.currency.startsWith(value as string)
          },
          filterSearch: true,
          render: (currency: string) => {
            // const component = DynamicTokenIcon({ token: currency })
            // console.log('----component---', component)
            return <div className="flex flex-cow gap-2">
              <DynamicTokenIcon token={currency} />
             <span>{currency}</span>
            </div>
          }
        },
        { title: 'Price', dataIndex: 'price', key: 'price', showSorterTooltip: true, sorter: (a: Token, b: Token) => a.price - b.price },
        { title: 'Date', dataIndex: 'date', key: 'date', render: (date: string) => new Date(date).toLocaleString() },
      ]}
      rowKey={(record: Token) => `${record.currency}${record.date}${record.price}`}
      size="small"
      scroll={{ y: 320 }}
    />
  </Modal>
}

export default TradingFormModal;