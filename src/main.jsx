import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import AppContainer from './AppContainer.jsx';

createRoot(document.getElementById('AppContainer')).render(
  <StrictMode>
    <AppContainer />
  </StrictMode>,
)
