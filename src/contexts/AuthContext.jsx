import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
const [token, setToken] = useState(() => localStorage.getItem('token'))
const [user, setUser] = useState(() => {
const u = localStorage.getItem('user')
return u ? JSON.parse(u) : null
})
const navigate = useNavigate()


useEffect(() => {
if (token) localStorage.setItem('token', token)
else localStorage.removeItem('token')
}, [token])


useEffect(() => {
if (user) localStorage.setItem('user', JSON.stringify(user))
else localStorage.removeItem('user')
}, [user])


const login = ({ token, user }) => {
setToken(token)
setUser(user || null)
navigate('/dashboard')
}


const logout = () => {
setToken(null)
setUser(null)
localStorage.removeItem('token')
localStorage.removeItem('user')
navigate('/login')
}


return (
<AuthContext.Provider value={{ token, user, login, logout }}>
{children}
</AuthContext.Provider>
)
}