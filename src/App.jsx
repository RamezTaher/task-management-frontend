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
import AdminClients from "./pages/AdminClients"
import AdminConsultantDetails from "./pages/AdminConsultantDetails"
import AdminClientDetails from "./pages/AdminClientDetails"
import AdminProjects from "./pages/AdminProjects"
import AdminProjectDetails from "./pages/AdminProjectDetails"
import AdminInterventionType from "./pages/AdminInterventionType"
import AdminInterventionTypeDetails from "./pages/AdminInterventionTypeDetails"
import ConsultantDashboard from "./pages/ConsultantDashboard"
import ConsultantClients from "./pages/ConsultantClients"
import ConsultantProjects from "./pages/ConsultantProjects"
import ConsultantProjectDetails from "./pages/ConsultantProjectDetails"
import ConsultantInterventions from "./pages/ConsultantInterventions"

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
        <Route path="/platform/admin/clients" element={<AdminClients />} />
        <Route
          path="/platform/admin/consultants/:id"
          element={<AdminConsultantDetails />}
        />
        <Route
          path="/platform/admin/clients/:id"
          element={<AdminClientDetails />}
        />
        <Route path="/platform/admin/projects" element={<AdminProjects />} />
        <Route
          path="/platform/admin/projects/:id"
          element={<AdminProjectDetails />}
        />
        <Route
          path="/platform/admin/intervention-type"
          element={<AdminInterventionType />}
        />
        <Route
          path="/platform/admin/intervention-type/:id"
          element={<AdminInterventionTypeDetails />}
        />

        {/* Consultant */}
        <Route
          path="/platform/consultant/dashboard"
          element={<ConsultantDashboard />}
        />
        <Route
          path="/platform/consultant/clients"
          element={<ConsultantClients />}
        />
        <Route
          path="/platform/consultant/projects"
          element={<ConsultantProjects />}
        />
        <Route
          path="/platform/consultant/projects/:id"
          element={<ConsultantProjectDetails />}
        />
        <Route
          path="/platform/consultant/interventions"
          element={<ConsultantInterventions />}
        />
      </Routes>
    </>
  )
}

export default App
