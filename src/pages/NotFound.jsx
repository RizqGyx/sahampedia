import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <Layout>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-lg w-full mx-8">
          <div
            className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl 
                      border border-indigo-100/50 dark:border-indigo-500/20 
                      p-8 md:p-12 overflow-hidden"
          >
            <div
              className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 
                        rounded-full mb-8 flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-2xl font-semibold">404</span>
            </div>

            <h1
              className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                        dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
            >
              Halaman Tidak Ditemukan
            </h1>

            <p className="mb-8 text-gray-600 dark:text-gray-300 text-lg">
              Maaf, halaman yang Anda cari tidak tersedia. Silakan kembali ke
              beranda.
            </p>

            <div className="flex flex-col gap-4">
              <Link to="/" className="w-full">
                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                   dark:from-indigo-500 dark:to-purple-500 text-white border-0 shadow-lg transition-all duration-300
                   hover:shadow-indigo-500/20 hover:shadow-xl cursor-pointer"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Kembali ke Beranda
                </Button>
              </Link>

              <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
                Jika Anda terus mengalami masalah, silakan hubungi tim dukungan
                kami di{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  info@sahampedia.id
                </span>
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 flex justify-center items-center space-x-1.5">
            <div className="h-1.5 w-3 rounded-full bg-indigo-400 dark:bg-indigo-500 opacity-70" />
            <div
              className="h-1.5 w-20 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 
                        dark:from-indigo-500 dark:to-purple-500 opacity-70"
            />
            <div className="h-1.5 w-3 rounded-full bg-purple-400 dark:bg-purple-500 opacity-70" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
