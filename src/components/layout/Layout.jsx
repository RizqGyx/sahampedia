import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow w-11/12 mx-auto">{children}</main>
      <Footer />
    </div>
  );
};
