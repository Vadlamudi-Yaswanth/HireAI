import "./App.css";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
             <div>Content coming soon</div>
          </DashboardLayout>
        </ProtectedRoute>
      } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
