import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'


export default function Layout({ children }) {
    const { user, logout } = useContext(AuthContext)
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/" className="font-bold text-lg">Airline</Link>
                    <Link to="/flights" className="text-sm">Flights</Link>
                </div>
                <div>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm">Hi, {user.username ?? user.name}</span>
                            <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
                            <Link to="/register" className="px-3 py-1 border rounded">Register</Link>
                        </div>
                    )}
                </div>
            </nav>


            <main className="p-6 max-w-4xl mx-auto">{children}</main>
        </div>
    )
}