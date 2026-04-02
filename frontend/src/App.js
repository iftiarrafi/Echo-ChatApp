import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './pages/protected/Dashboard'
import Home from './pages/Home'
import CheckAuth from './pages/protected/CheckAuth'
import Search from './pages/protected/Search'
import Login from './pages/LoginPage'
import Register from './pages/Register'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* protected */}
        <Route path='/auth' element={<CheckAuth />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='search' element={<Search />} />
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App