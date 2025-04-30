import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Determina el basename a partir de la configuración de Vite
// Vite reemplaza import.meta.env.BASE_URL durante el build
const basename = import.meta.env.BASE_URL || '/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Pasa el basename al BrowserRouter */}
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
