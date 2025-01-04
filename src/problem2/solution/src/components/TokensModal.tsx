import { Modal, Table, Tooltip } from "antd";
import { FC, useContext } from "react";
import { Token } from "../model/trading.model";
import { TradingPageContext } from "../context/tradingPageContext.context";
import DynamicTokenIcon from "./common/DynamicTokenIcon";

type TokensModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const TokensModal: FC<TokensModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const context = useContext(TradingPageContext);
  const tokens = context?.tokens || []
  return <Modal
    title="Token Rate"
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
          key: 'currency', 
          filterMode: 'menu',
          filters: tokens
            .map((token: Token) => ({ text: token.currency, value: token.currency })),
          onFilter: (value, record) => {
            return  record.currency.startsWith(value as string)
          },
          filterSearch: true,
          render: (currency: string) => {
            return <div className="flex flex-row gap-2">
              <DynamicTokenIcon token={currency} />
             <span>{currency}</span>
            </div>
          }
        },
        { 
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          showSorterTooltip: true,
          sorter: (a: Token, b: Token) => a.price - b.price,
          render: (price: string) => {
            return <Tooltip title={price}>
            <span>{Number(price).toFixed(3)}</span>
            </Tooltip>
          }
        },
        { title: 'Date', dataIndex: 'date', key: 'date', render: (date: string) => new Date(date).toLocaleString() },
      ]}
      rowKey={(record: Token) => `${record.currency}${record.date}${record.price}`}
      size="small"
      scroll={{ y: 320 }}
    />
  </Modal>
}

export default TokensModal;