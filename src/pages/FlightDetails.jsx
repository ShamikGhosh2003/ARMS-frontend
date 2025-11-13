import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'
import { AuthContext } from '../contexts/AuthContext'


export default function FlightDetails() {
    const { id } = useParams()
    const [flight, setFlight] = useState(null)
    const { token } = useContext(AuthContext)
    const nav = useNavigate()


    useEffect(() => { const fetch = async () => { try { const res = await api.get(`/api/flights/${id}`); setFlight(res.data); } catch (err) { console.error(err) } }; fetch() }, [id])


    const handleReserve = async () => {
        if (!token) return nav('/login')
        try {
            const payload = { flightId: id, seats: 1 }
            const res = await api.post('/api/reservations', payload)
            alert('Reserved! id: ' + (res.data.id || res.data.reservationId))
            nav('/dashboard')
        } catch (err) { console.error(err); alert('Reservation failed') }
    }


    if (!flight) return <div>Loading...</div>
    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl">{flight.airlineName || flight.airline?.name}</h2>
            <p>{flight.source || flight.from} → {flight.destination || flight.to}</p>
            <p>Departure: {flight.departureTime ? new Date(flight.departureTime).toLocaleString() : ''}</p>
            <p>Price: ₹{flight.price || flight.fare}</p>
            <button onClick={handleReserve} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Reserve</button>
        </div>
    )
}