import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import EmployeeLeaveRequest from "./pages/EmployeeLeaveRequest"
import AdminDashboardEmployees from "./pages/AdminDashboardEmployees"
import AdminEditEmployee from "./pages/AdminEditEmployee"
import AdminLeaveRequest from "./pages/AdminLeaveRequest"
import AdminLeaveRequestDetails from "./pages/AdminLeaveRequestDetails"
import ClientSignIn from "./pages/ClientSignIn"
import ClientRegister from "./pages/ClientRegister"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/client/login" element={<ClientSignIn />} />
        <Route path="/auth/client/register" element={<ClientRegister />} />

        {/* <Route path="/auth/register" element={<SignUp />} />
        <Route path="/platform/dashboard" element={<EmployeeDashboard />} />
        <Route
          path="/platform/leave-request/:id"
          element={<EmployeeLeaveRequest />}
        />
        <Route path="/admin/employee" element={<AdminDashboardEmployees />} />
        <Route path="/admin/employee/:id" element={<AdminEditEmployee />} />
        <Route path="/admin/leave-request" element={<AdminLeaveRequest />} />
        <Route
          path="/admin/leave-request/:id"
          element={<AdminLeaveRequestDetails />}
        /> */}
      </Routes>
    </>
  )
}

export default App
