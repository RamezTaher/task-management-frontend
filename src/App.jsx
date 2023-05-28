import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ClientSignIn from "./pages/ClientSignIn"
import ClientRegister from "./pages/ClientRegister"
import ConsultantSignIn from "./pages/ConsultantSignIn"
import ConsultantRegister from "./pages/ConsultantRegister"
import AdminSignIn from "./pages/AdminSignIn"
import ClientDashboard from "./pages/ClientDashboard"
import ClientStartProject from "./pages/ClientStartProject"
import ClientControlProjects from "./pages/ClientControlProjects"
import ClientControlProjectDetail from "./pages/ClientControlProjectDetail"
import AdminDashboard from "./pages/AdminDashboard"
import AdminConsultants from "./pages/AdminConsultants"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/client/login" element={<ClientSignIn />} />
        <Route path="/auth/client/register" element={<ClientRegister />} />
        <Route path="/auth/consultant/login" element={<ConsultantSignIn />} />
        <Route
          path="/auth/consultant/register"
          element={<ConsultantRegister />}
        />
        <Route path="/auth/admin/login" element={<AdminSignIn />} />
        <Route
          path="/platform/client/dashboard"
          element={<ClientDashboard />}
        />
        <Route
          path="/platform/client/start-project"
          element={<ClientStartProject />}
        />
        <Route
          path="/platform/client/projects"
          element={<ClientControlProjects />}
        />
        <Route
          path="/platform/client/projects/:id"
          element={<ClientControlProjectDetail />}
        />
        <Route path="/platform/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/platform/admin/consultants"
          element={<AdminConsultants />}
        />

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
