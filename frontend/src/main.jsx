import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersonasAPP } from './PersonasAPP'
import './styles/styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersonasAPP />
  </StrictMode>,
)
