import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hooks'
import { PrivateRoute } from './shared/routing/PrivateRoute'

import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import BettingTable from './components/betting-table'

import './App.css'

const App = () => {
  const { userId, token, login, logout } = useAuth()
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, userId, token, login, logout }}
    >
      <Navbar />
      <Router>
        <Routes>
          <Route path="/betting-table" element={<PrivateRoute component={BettingTable} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
