import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'

// Wait for DOM to be ready
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!');
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Error rendering app:', error);
    rootElement.innerHTML = '<div style="padding: 20px; color: red;">Error loading extension. Check console for details.</div>';
  }
}
