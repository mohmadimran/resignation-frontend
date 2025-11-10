import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/homePage";
import Register from "./component/auth/register";
import Login from "./component/auth/login";
import EmployeeDashboard from "./pages/EmployeeDashbord";
import AdminDashboard from "./pages/AdminDashboard";
import ExitResponses from "./pages/ExitResponse";
// import AdminResignationList from "./component/admin/adminResignationList";
import ProtectedRoute from "./routes/ProtectedRoutes"; 

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hr-dashboard"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
       
        <Route
          path="/hr/responses"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <ExitResponses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
