import React, { useState, useContext } from 'react'
import { login as apiLogin } from '../api/auth'
import { AuthContext } from '../contexts/AuthContext'


export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await apiLogin({ username, password })
            // backend returns { jwt: '...' }
            const token = data.jwt
            if (!token) throw new Error('No token returned')
            login({ token, user: { username } })
        } catch (err) {
            console.error(err)
            alert(err?.response?.data || 'Login failed')
        }
    }


    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="p-2 border rounded" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="p-2 border rounded" required />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
            </form>
        </div>
    )
}