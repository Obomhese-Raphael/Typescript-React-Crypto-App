import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CoinContextProvider from './Context/Context.tsx'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <CoinContextProvider>
          <App />
      </CoinContextProvider>
    </BrowserRouter>
  </>,
)