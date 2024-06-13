import GlobalStyles from './components/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </UserProvider>
  </React.StrictMode>,
)
