import axios from "axios"

const API_URL = "http://localhost:5000/api"
console.log(API_URL)

const api = axios.create({ baseURL: API_URL })
const token = JSON.parse(localStorage.getItem("token"))

function getConfig() {
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  }
}

// Auth
export const logClient = (data) =>
  api.post(`/auth/client/login`, data, getConfig())
export const registerClient = (data) =>
  api.post(`/auth/client/register`, data, getConfig())

export const logConsultant = (data) =>
  api.post(`/auth/consultant/login`, data, getConfig())
export const registerConsultant = (data) =>
  api.post(`/auth/consultant/register`, data, getConfig())

export const getClientProfile = () =>
  api.get(`/auth/client/status`, getConfig())
export const getAdminProfile = () => api.get(`/auth/admin/status`, getConfig())
export const getConsultantProfile = () =>
  api.get(`/auth/consultant/status`, getConfig())

export const logAdmin = (data) =>
  api.post(`/auth/admin/login`, data, getConfig())

// Tickets
export const createTicket = (data) => api.post(`/tickets`, data, getConfig())
export const getProjectsByClient = (status) =>
  api.get(`/tickets/client/all?status=${status}`, getConfig())
export const getProjectsByConsultant = (status) =>
  api.get(`/tickets/consultant/all?status=${status}`, getConfig())

export const getAllProjects = (status) =>
  api.get(`/tickets?status=${status}`, getConfig())

export const getProjectById = (id) => api.get(`/tickets/${id}`, getConfig())
export const updateProject = (id, data) =>
  api.put(`/tickets/${id}`, data, getConfig())

export const assignConsultantToTicket = (id, data) =>
  api.patch(`/tickets/${id}`, data, getConfig())

// Admin
export const getAllConsultants = () => api.get(`/consultants`, getConfig())
export const getConsultantById = (id) =>
  api.get(`/consultants/${id}`, getConfig())
export const getAllClients = () => api.get(`/clients`, getConfig())

export const getClientById = (id) => api.get(`/clients/${id}`, getConfig())
export const updateClient = (id, data) =>
  api.put(`/clients/${id}`, data, getConfig())
export const deleteClient = (id) => api.delete(`/clients/${id}`, getConfig())
export const updateConsultant = (id, data) =>
  api.put(`/consultants/${id}`, data, getConfig())
export const deleteConsultant = (id) =>
  api.delete(`/consultants/${id}`, getConfig())

// Task
export const createTask = (data) => api.post(`/tasks`, data, getConfig())
export const updateTask = (id, data) =>
  api.put(`/tasks/${id}`, data, getConfig())

// Intervention Types

export const getAllInterventionTypes = () =>
  api.get(`/interventions-types`, getConfig())
export const createInterventionType = (data) =>
  api.post(`/interventions-types`, data, getConfig())

export const getInterventionTypeById = (id) =>
  api.get(`/interventions-types/${id}`, getConfig())

export const updateInterventionType = (id, data) =>
  api.put(`/interventions-types/${id}`, data, getConfig())
export const deleteInterventionType = (id) =>
  api.delete(`/interventions-types/${id}`, getConfig())

// Interventions
export const getAllInterventionsByConsultant = (status) =>
  api.get(`/interventions/consultant/all?status=${status}`, getConfig())
export const getAllInterventions = (status) =>
  api.get(`/interventions?status=${status}`, getConfig())
export const createIntervention = (data) =>
  api.post(`/interventions`, data, getConfig())
export const deleteIntervention = (id) =>
  api.delete(`/interventions/${id}`, getConfig())
export const updateIntervention = (id, data) =>
  api.put(`/interventions/${id}`, data, getConfig())
