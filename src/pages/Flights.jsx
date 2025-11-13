import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { Link } from 'react-router-dom'


export default function Flights() {
    const [flights, setFlights] = useState([])
    useEffect(() => { const fetchFlights = async () => { try { const res = await api.get('/api/flights'); setFlights(res.data); } catch (err) { console.error(err) } }; fetchFlights() }, [])
    return (
        <div>
            <h2 className="text-2xl mb-4">Available Flights</h2>
            <div className="grid grid-cols-1 gap-4">
                {flights.map(f => (
                    <div key={f.id || f.flightId} className="p-4 bg-white rounded shadow flex justify-between">
                        <div>
                            <div className="font-semibold">{f.airlineName || f.airline?.name} — {f.source || f.from} → {f.destination || f.to}</div>
                            <div className="text-sm">{f.departureTime ? new Date(f.departureTime).toLocaleString() : ''}</div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="font-bold">₹{f.price || f.fare}</div>
                            <Link to={`/flights/${f.id || f.flightId}`} className="px-3 py-1 border rounded">View</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}