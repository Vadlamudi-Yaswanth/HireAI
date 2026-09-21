import "./App.css";
import {BrowserRouter, Routes,Route,Navigate} from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ApplicationDetails from "./pages/Applications/ApplicationDetails";
import Applications from "./pages/Applications/Applications";
import ApplyJob from "./pages/Jobs/ApplyJob";
import Jobs from "./pages/Jobs/Jobs";
import CreateJob from "./pages/Jobs/CreateJob";
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to ="/login" replace />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
             <div>Content coming soon</div>
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path ="/applications/:id" element ={
        <ProtectedRoute>
          <ApplicationDetails/>
        </ProtectedRoute>
      } />
      <Route path="/jobs/:id/applications" element ={
        <ProtectedRoute>
          <Applications/>
        </ProtectedRoute>
      } />
      <Route path="/jobs/:id/apply" element={<ApplyJob />} />
      <Route path="/jobs/jobsPage" element ={
        <ProtectedRoute>
          <Jobs />
        </ProtectedRoute>
      } />
      <Route path = "/jobs/create" element={
        <ProtectedRoute>
          <CreateJob />
        </ProtectedRoute>
      } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
