import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Navbar from "./pages/NavBar";
import MentorHome from "./pages/MentorHome";
import MenteesList from "./pages/MenteesList";
import ProgressGraph from "./pages/ProgressGraph";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import StudentFeedback from "./pages/StudentFeedback";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

// Layout with Sidebar and Navbar
function AuthenticatedLayout() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Layout without Sidebar
function GuestLayout() {
  return (
    <div className="min-h-screen w-full">
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes (no sidebar/navbar) */}
        <Route element={<GuestLayout />}>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* Authenticated Routes (with sidebar and navbar) */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<MentorHome />} />
          <Route path="/mentees" element={<MenteesList />} />
          <Route path="/progress" element={<ProgressGraph />} />
          <Route path="/meetings" element={<ScheduleMeeting />} />
          <Route path="/feedback" element={<StudentFeedback />} />
          <Route path="/mentor" element={<MentorHome />} />
          <Route path="/mentor/mentees" element={<MenteesList />} />
          <Route path="/mentor/progress" element={<ProgressGraph />} />
          <Route path="/mentor/meetings" element={<ScheduleMeeting />} />
          <Route path="/mentor/feedback" element={<StudentFeedback />} />
          <Route path="/mentor/*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
