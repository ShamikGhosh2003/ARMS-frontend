import React, { useEffect, useState } from 'react'
import api from '../api/api'


export default function Dashboard() {
    const [reservations, setReservations] = useState([])
    useEffect(() => { const fetch = async () => { try { const res = await api.get('/api/reservations'); setReservations(res.data); } catch (err) { console.error(err) } }; fetch() }, [])
    return (
        <div>
            <h2 className="text-2xl mb-4">Reservations</h2>
            <ul className="space-y-3">
                {reservations.map(r => (
                    <li key={r.id || r.reservationId} className="bg-white p-4 rounded shadow">
                        <div>Flight: {r.flightId} — Seats: {r.seats}</div>
                        <div>Booked on: {r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}