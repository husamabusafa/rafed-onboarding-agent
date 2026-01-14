import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@hsafa/ui-sdk/index.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
