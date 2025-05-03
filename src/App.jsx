import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import Course from "./pages/Course";
import Implementation from "./pages/Implementation";
import Reference from "./pages/Reference";
import NotFound from "./pages/NotFound";
import { ChatbotBubble } from "./components/chatbot/ChatbotBubble";
import { Toaster } from "sonner";
import ScrollToTop from "./components/layout/ScrollTop";

function App() {
  useEffect(() => {
    // Check for dark mode preference
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Add custom classes to the body for animations
    document.body.classList.add("transition-colors", "duration-300");
  }, []);

  return (
    <>
      <Toaster richColors expand={false} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/prediction/:slug" element={<Prediction />}></Route>
        <Route path="/course" element={<Course />}></Route>
        <Route path="/implementation" element={<Implementation />}></Route>
        <Route path="/reference" element={<Reference />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatbotBubble />
    </>
  );
}

export default App;
