import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RouterSwitch from './RouterSwitch'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <RouterSwitch />
    </UserProvider>
    <ToastContainer />
  </React.StrictMode>
)
