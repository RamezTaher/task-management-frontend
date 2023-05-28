import axios from "axios"

const API_URL = "http://localhost:5000/api"
console.log(API_URL)

const api = axios.create({ baseURL: API_URL })
const token = JSON.parse(localStorage.getItem("token"))
const config = {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
}

// Auth
export const logClient = (data) => api.post(`/auth/client/login`, data, config)
export const registerClient = (data) =>
  api.post(`/auth/client/register`, data, config)

export const logConsultant = (data) =>
  api.post(`/auth/consultant/login`, data, config)
export const registerConsultant = (data) =>
  api.post(`/auth/consultant/register`, data, config)

export const getClientProfile = () => api.get(`/auth/client/status`, config)
export const getAdminProfile = () => api.get(`/auth/admin/status`, config)

export const logAdmin = (data) => api.post(`/auth/admin/login`, data, config)

// Tickets

export const createTicket = (data) => api.post(`/tickets`, data, config)
export const getProjectsByClient = (status) =>
  api.get(`/tickets/client/all?status=${status}`, config)

export const getAllProjects = (status) =>
  api.get(`/tickets?status=${status}`, config)

export const getProjectById = (id) => api.get(`/tickets/${id}`, config)
export const updateProject = (id, data) =>
  api.put(`/tickets/${id}`, data, config)

// Admin
export const getAllConsultants = () => api.get(`/consultants`, config)
export const getConsultantById = (id) => api.get(`/consultants/${id}`, config)
export const getAllClients = () => api.get(`/clients`, config)

export const getClientById = (id) => api.get(`/clients/${id}`, config)
export const updateClient = (id, data) =>
  api.put(`/clients/${id}`, data, config)
export const deleteClient = (id) => api.delete(`/clients/${id}`, config)
export const updateConsultant = (id, data) =>
  api.put(`/consultants/${id}`, data, config)
export const deleteConsultant = (id) => api.delete(`/consultants/${id}`, config)
