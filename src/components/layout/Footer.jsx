import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Unique wave divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-full z-10 h-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute h-full w-full"
          fill="currentColor"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="text-gray-900 dark:text-blue-950"
          ></path>
        </svg>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-blue-950 dark:from-gray-900 dark:to-indigo-950 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 group">
                  <div className="relative overflow-hidden rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 group-hover:shadow-lg transition-all duration-300">
                    <TrendingUp className="h-6 w-6 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    SahamPedia
                  </span>
                </div>
                <p className="text-gray-300">
                  Platform edukasi dan analisis saham blue chip Indonesia dengan
                  dukungan AI.
                </p>
                {/* <div className="flex space-x-3 pt-2">
                  {[Twitter, Github, Linkedin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div> */}
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-white">
                  Navigasi
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors inline-flex items-center hover:translate-x-1 duration-200"
                    >
                      Beranda
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/implementation"
                      className="text-gray-300 hover:text-white transition-colors inline-flex items-center hover:translate-x-1 duration-200"
                    >
                      Implementasi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/referensi"
                      className="text-gray-300 hover:text-white transition-colors inline-flex items-center hover:translate-x-1 duration-200"
                    >
                      Referensi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/kursus"
                      className="text-gray-300 hover:text-white transition-colors inline-flex items-center hover:translate-x-1 duration-200"
                    >
                      Kursus
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-white">
                  Sumber Data
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: "IDX", url: "https://www.idx.co.id" },
                    { name: "Bloomberg", url: "https://www.bloomberg.com" },
                    { name: "Reuters", url: "https://www.reuters.com" },
                  ].map((source) => (
                    <li key={source.name}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors group inline-flex items-center"
                      >
                        {source.name}
                        <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-white">
                  Kontak
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300 group">
                    <MapPin className="h-4 w-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                    <span>Jakarta, Indonesia</span>
                  </li>
                  <li className="flex items-center text-gray-300 group">
                    <Mail className="h-4 w-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                    <span>info@sahampedia.id</span>
                  </li>
                  <li className="flex items-center text-gray-300 group">
                    <Phone className="h-4 w-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                    <span>+62 21 1234 5678</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400">
                © {new Date().getFullYear()} SahamPedia Insight Hub. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
