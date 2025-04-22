import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 -z-10 transition-all duration-500"></div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5">
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-300/10 to-purple-300/10 dark:from-blue-500/10 dark:to-purple-500/10 blur-3xl"
          style={{
            top: "5%",
            right: "10%",
            transform: `translateY(${scrollY * 0.1}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-300/10 to-pink-300/10 dark:from-indigo-500/10 dark:to-pink-500/10 blur-3xl"
          style={{
            bottom: "15%",
            left: "10%",
            transform: `translateY(${-scrollY * 0.05}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-green-300/10 to-teal-300/10 dark:from-green-500/10 dark:to-teal-500/10 blur-3xl"
          style={{
            top: "50%",
            left: "30%",
            transform: `translateY(${scrollY * 0.08}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      <div className="fixed inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none -z-10"></div>

      <Header />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow relative z-10"
      >
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-blue-50/40 to-purple-50/40 dark:from-blue-900/40 dark:to-purple-900/40 backdrop-blur-sm -translate-y-full"></div>
          <div className="container mx-auto px-4 py-8">{children}</div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};
