import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Flights from './pages/Flights'
import FlightDetails from './pages/FlightDetails'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'


export default function App() {
return (
<Layout>
<Routes>
<Route path="/" element={<Flights />} />
<Route path="/flights" element={<Flights />} />
<Route path="/flights/:id" element={<FlightDetails />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
</Routes>
</Layout>
)
}