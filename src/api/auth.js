import api from './api'


export const login = async (credentials) => {
const res = await api.post('/auth/login', credentials)
return res.data
}


export const register = async (payload) => {
const res = await api.post('/auth/register', payload)
return res.data
}