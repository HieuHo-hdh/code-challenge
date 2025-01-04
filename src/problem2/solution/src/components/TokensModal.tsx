import { Modal, Table } from "antd";
import { FC, useContext } from "react";
import { Token } from "../model/trading.model";
import { TradingPageContext } from "../context/tradingPageContext.context";

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
    title="Tokens"
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

export default TokensModal;