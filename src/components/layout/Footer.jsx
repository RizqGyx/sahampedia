import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-blue-900 mt-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto w-11/12">
        <div className="pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-blue-400" />
                <span className="font-bold text-xl text-white">SahamPedia</span>
              </div>
              <p className="text-gray-300">
                Platform edukasi dan analisis saham blue chip Indonesia dengan
                dukungan AI.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">
                Navigasi
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/implementation"
                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center"
                  >
                    Implementasi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reference"
                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center"
                  >
                    Referensi
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
                      className="text-gray-300 hover:text-white transition-colors inline-flex items-center"
                    >
                      {source.name}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Kontak</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Jakarta, Indonesia</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@sahampedia.id</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-2" />
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
    </footer>
  );
};

export default Footer;
