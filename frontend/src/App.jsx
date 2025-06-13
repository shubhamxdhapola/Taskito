import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./redux/slices/authSlice";
import Toaster from "./components/Toaster";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ManageTasks from "./pages/admin/ManageTasks";
import CreateTask from "./pages/admin/CreateTask";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import MyTasks from "./pages/user/MyTasks";
import ViewTaskDetails from "./pages/user/ViewTaskDetails";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import DefaultRoute from "./routes/DefaultRoute";
import PageNotFound from "./pages/PageNotFound";
import LoadingScreen from "./components/ui/LoadingScreen";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const dispatch = useDispatch();
  const { authenticating } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800, 
    });
  }, []);

  if (authenticating) {
    return <LoadingScreen height="100dvh" />;
  }

  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<DefaultRoute />} />

          {/* Auth Routes */}
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          {/* User Routes */}
          <Route element={<UserRoutes />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route
              path="/user/task-details/:id"
              element={<ViewTaskDetails />}
            />
          </Route>

          {/* Wildcard Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
