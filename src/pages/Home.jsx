import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, MessageSquare, LineChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { TabTitle } from "@/lib/generalFunction";

const Home = () => {
  TabTitle("SahamPedia | Home");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r rounded-lg from-blue-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            SahamPedia Insight Hub
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-white/90">
            Platform edukasi dan analisis saham blue chip Indonesia dengan
            dukungan AI untuk keputusan investasi yang lebih cerdas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="default"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Mulai Belajar
            </Button>
            <Link to="/implementation">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Lihat Implementasi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect p-6 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analisis Blue Chip</h3>
              <p className="text-gray-600">
                Analisis mendalam saham blue chip Indonesia dengan indikator
                fundamental dan teknikal terbaik.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">RASA Chatbot</h3>
              <p className="text-gray-600">
                Dapatkan informasi saham dan jawaban pertanyaan investasi dari
                chatbot cerdas berbasis RASA.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <LineChart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Prediksi Pasar</h3>
              <p className="text-gray-600">
                Prediksi tren pasar dan saham blue chip dengan model machine
                learning canggih.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stocks Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Saham Populer</h2>
              <p className="text-gray-600">
                Pantau saham blue chip terpopuler di Indonesia
              </p>
            </div>
            <Link
              to="/prediksi/bbca"
              className="flex items-center text-blue-600 mt-4 md:mt-0"
            >
              Lihat Semua <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {prediksiCards.map((card) => (
              <Link
                key={card.code}
                to={`/prediksi/${card.code.toLowerCase()}`}
                className="card-gradient p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
              >
                <h3 className="text-lg font-bold mb-1">{card.code}</h3>
                <p className="text-sm text-gray-500 mb-2">{card.name}</p>
                <p
                  className={`text-lg font-semibold ${
                    card.change > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {card.price}
                </p>
                <p
                  className={`text-sm ${
                    card.change > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {card.change > 0 ? "+" : ""}
                  {card.change}%
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br rounded-lg from-gray-900 to-blue-900 opacity-95"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">Siap Memulai?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white/80">
            Tingkatkan strategi investasi saham blue chip Anda dengan analisis
            dan wawasan terbaik dari SahamPedia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Daftar Sekarang
            </Button>
            <Link to="/implementation">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Pelajari Detail Implementasi
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Sample data for stock cards
const prediksiCards = [
  { code: "BBCA", name: "Bank Central Asia", price: "Rp 9,850", change: 0.75 },
  {
    code: "BBNI",
    name: "Bank Negara Indonesia",
    price: "Rp 4,780",
    change: -0.42,
  },
  {
    code: "BBRI",
    name: "Bank Rakyat Indonesia",
    price: "Rp 5,225",
    change: 1.05,
  },
  { code: "BMRI", name: "Bank Mandiri", price: "Rp 6,100", change: 0.83 },
  {
    code: "TLKM",
    name: "Telekomunikasi Indonesia",
    price: "Rp 3,950",
    change: -0.25,
  },
  {
    code: "ASII",
    name: "Astra International",
    price: "Rp 5,575",
    change: 0.91,
  },
];

export default Home;
