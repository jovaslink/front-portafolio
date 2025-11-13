import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { JovaslinkApp } from './JovaslinkApp'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JovaslinkApp/>
  </StrictMode>,
)
