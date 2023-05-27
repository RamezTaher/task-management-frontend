import axios from "axios"

const API_URL = "http://localhost:5000/api"
console.log(API_URL)

const api = axios.create({ baseURL: API_URL })
const config = { withCredentials: true }

// Auth
export const logClient = (data) => api.post(`/auth/client/login`, data, config)
export const registerClient = (data) =>
  api.post(`/auth/client/register`, data, config)

export const logConsultant = (data) =>
  api.post(`/auth/consultant/login`, data, config)
export const registerConsultant = (data) =>
  api.post(`/auth/consultant/register`, data, config)

export const postLogUser = (data) => api.post(`/auth/login`, data, config)

// Departments
export const getDepartments = () => axios.get(`${API_URL}/department`, config)
export const getDepartmentById = (id) =>
  axios.get(`${API_URL}/department/${id}`, config)

// Leave Request
export const getLeaveRequests = (leaveRequestStatus) =>
  axios.get(`${API_URL}/leave-request?status=${leaveRequestStatus}`, config)

export const getLeaveRequestById = (id) =>
  axios.get(`${API_URL}/leave-request/${id}`, config)

export const getLeaveRequestByEmployee = (id) =>
  axios.get(`${API_URL}/leave-request/employee/${id}`, config)

export const postLeaveRequest = (data) =>
  axios.post(`${API_URL}/leave-request`, data, config)

export const updateLeaveRequest = (id, data) =>
  axios.put(`${API_URL}/leave-request/${id}`, data, config)

// Leave Type
export const getLeaveTypes = () => axios.get(`${API_URL}/leave-type`, config)
export const getLeaveTypeById = (id) =>
  axios.get(`${API_URL}/leave-type/${id}`, config)

// Employee

export const getEmployeeById = (id) =>
  axios.get(`${API_URL}/employee/${id}`, config)
export const getEmployees = () => axios.get(`${API_URL}/employee`, config)
export const deleteEmployee = (id) =>
  axios.delete(`${API_URL}/employee/${id}`, config)
export const updateEmployee = (id, data) =>
  axios.put(`${API_URL}/employee/${id}`, data, config)
