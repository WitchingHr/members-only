import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RouterSwitch from './RouterSwitch'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterSwitch />
    <ToastContainer />
  </React.StrictMode>
)
