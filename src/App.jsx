import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CmsProvider } from './context/CmsContext'
import Layout from './components/layout/Layout'
import AdminApp from './admin/AdminApp'

function PublicSite() {
  return (
    <CmsProvider>
      <Layout />
    </CmsProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
