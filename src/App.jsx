import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Implementation from "./pages/Implementation";
import Reference from "./pages/Reference";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/course" element={<Course />}></Route>
        <Route path="/implementation" element={<Implementation />}></Route>
        <Route path="/reference" element={<Reference />}></Route>
        <Route
          path="*"
          element={
            <div className="h-screen flex flex-col justify-center items-center">
              <img
                src="/404_page.jpg"
                alt="404 Not Found"
                className="w-4/5 md:w-3/5 lg:w-3/6 h-auto"
              />
              <Link
                to="/"
                className="px-16 md:px-40 py-1 md:py-2 font-bold bg-violet-400 border-4 text-white rounded-xl shadow-md hover:bg-violet-600"
              >
                Go to Home
              </Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
