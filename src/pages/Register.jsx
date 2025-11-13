import React, { useState } from 'react'
import { register as apiRegister } from '../api/auth'
import { useNavigate } from 'react-router-dom'


export default function Register() {
    const [form, setForm] = useState({ name: '', username: '', password: '', confirm: '', address: '', phone: '', dob: '' })
    const nav = useNavigate()


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.password !== form.confirm) { alert('Passwords do not match'); return }
        try {
            const payload = { name: form.name, username: form.username, password: form.password, address: form.address, phone: form.phone, dob: form.dob }
            await apiRegister(payload)
            alert('Registration successful. Please login')
            nav('/login')
        } catch (err) { console.error(err); alert(err?.response?.data || 'Registration failed') }
    }


    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl mb-4">Create Account</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="p-2 border rounded" required />
                <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="p-2 border rounded" required />
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="p-2 border rounded" required />
                <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Confirm Password" className="p-2 border rounded" required />
                <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="p-2 border rounded" />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (10 digits)" pattern="\d{10}" className="p-2 border rounded" required />
                <input name="dob" type="date" value={form.dob} onChange={handleChange} className="p-2 border rounded" required />
                <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded">Register</button>
            </form>
            <div className="mt-4 text-sm text-center">Already have an account? <a href="/login" className="text-blue-600 ml-1">Login</a></div>
        </div>
    )
}