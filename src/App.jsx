import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import ScrollToTop from "./components/layout/ScrollTop";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import Course from "./pages/Course";
import Implementation from "./pages/Implementation";
import Reference from "./pages/Reference";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCourse from "./pages/AdminCourse";
import AdminModule from "./pages/AdminModule";
import AdminLesson from "./pages/AdminLesson";
import AdminContent from "./pages/AdminContent";
import AdminJournal from "./pages/AdminJournal";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import { ChatbotBubble } from "./components/chatbot/ChatbotBubble";

function App() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const hideChatbot =
    location.pathname === "/login" ||
    location.pathname === "/admin" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/admin/course" ||
    location.pathname === "/admin/module" ||
    location.pathname === "/admin/lesson" ||
    location.pathname === "/admin/content" ||
    location.pathname === "/admin/journal";

  useEffect(() => {
    // Dark mode check
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.body.classList.add("transition-colors", "duration-300");
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster richColors expand={false} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction/:symbol" element={<Prediction />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/:course_id" element={<Course />} />
        <Route path="/implementation" element={<Implementation />} />
        <Route path="/reference" element={<Reference />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login />
            ) : (
              <Navigate to="/admin/dashboard" replace />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? <Admin /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/course"
          element={
            isAuthenticated ? <AdminCourse /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin/module"
          element={
            isAuthenticated ? <AdminModule /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin/lesson"
          element={
            isAuthenticated ? <AdminLesson /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin/content"
          element={
            isAuthenticated ? (
              <AdminContent />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/journal"
          element={
            isAuthenticated ? (
              <AdminJournal />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideChatbot && <ChatbotBubble />}
    </>
  );
}

export default App;
