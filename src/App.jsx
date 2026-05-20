import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CmsProvider } from './context/CmsContext'
import Layout from './components/layout/Layout'
import AdminApp from './admin/AdminApp'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CmsProvider>
          <Routes>
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="/*" element={<Layout />} />
          </Routes>
        </CmsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
