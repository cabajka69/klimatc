import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RootApp from './RootApp';
import './index.css';

// Renderování hlavní aplikace do kořenového elementu
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);