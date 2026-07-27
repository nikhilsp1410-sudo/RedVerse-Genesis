import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Web3Provider } from '@/web3'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Web3Provider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Web3Provider>
  </StrictMode>,
)
