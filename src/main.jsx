import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <GoogleOAuthProvider clientId="409185840466-dk2cs4mdrl315i7s3am5pop520c3uuig.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,

)
