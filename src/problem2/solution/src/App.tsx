import './App.css'
import { TradingPageProvider } from './context/tradingPageContext.context'
import TradingPage from './pages/TradingPage'

function App() {
  return (
    <TradingPageProvider>
      <TradingPage />
    </TradingPageProvider>
  )
}

export default App
