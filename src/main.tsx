import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { BUSINESS_ID, API_BASE_URL, RECAPTCHA_SITE_KEY } from './App.tsx'

declare global {
  interface Window {
    KORA_SITE?: {
      businessId: string
    }
    KORA_CONFIG?: {
      apiBaseUrl?: string
      recaptchaSiteKey?: string
    }
  }
}

// Expose stable globals for any runtime code that needs them.
window.KORA_SITE = {
  businessId: BUSINESS_ID,
}
window.KORA_CONFIG = {
  apiBaseUrl: API_BASE_URL,
  recaptchaSiteKey: RECAPTCHA_SITE_KEY,
}

const rootEl = document.getElementById('root')

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  console.error('Root element #root not found in the document.');
}