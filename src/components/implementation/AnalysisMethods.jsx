import React from "react";
import { LineChart, TrendingUp, BarChart, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export const AnalysisMethods = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="analysis-methods" className="scroll-mt-24">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent mb-6"
      >
        Metode Analisis
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-gray-700 mb-6"
      >
        SahamPedia menggunakan pendekatan multi-metode untuk menganalisis saham
        blue chip, mengintegrasikan analisis fundamental, teknikal, dan sentimen
        pasar.
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          {
            icon: BarChart,
            title: "Analisis Fundamental",
            items: [
              "Evaluasi laporan keuangan (neraca, laba rugi, arus kas)",
              "Analisis rasio keuangan (likuiditas, profitabilitas, leverage)",
              "Valuasi dengan metode DCF (Discounted Cash Flow)",
              "Perbandingan rasio P/E, PBV, dan dividend yield dengan rata-rata industri",
              "Penilaian model bisnis dan keunggulan kompetitif",
            ],
          },
          {
            icon: LineChart,
            title: "Analisis Teknikal",
            items: [
              "Analisis tren harga dengan moving averages (MA, EMA, MACD)",
              "Oscillator untuk mengidentifikasi kondisi overbought/oversold (RSI, Stochastic)",
              "Analisis pola grafik (head and shoulders, double top/bottom)",
              "Analisis volume untuk konfirmasi tren",
              "Fibonacci retracement untuk level support dan resistance",
            ],
          },
          {
            icon: TrendingUp,
            title: "Model Prediktif",
            items: [
              "Model deret waktu (ARIMA, GARCH) untuk prediksi volatilitas",
              "Deep learning (LSTM, GRU) untuk prediksi tren harga",
              "Random Forest untuk klasifikasi saham berdasarkan potensi pertumbuhan",
              "Gradient Boosting untuk prediksi kinerja kuartalan",
              "Validasi model dengan backtesting pada data historis",
            ],
          },
          {
            icon: PieChart,
            title: "Analisis Sentimen",
            items: [
              "NLP untuk analisis sentimen berita dan laporan analis",
              "Pemantauan aktivitas sosial media (Twitter, forum investasi)",
              "Analisis volume pencarian Google Trends",
              "Pelacakan perubahan rekomendasi analis",
              "Evaluasi pergeseran sentimen institusional melalui data kepemilikan",
            ],
          },
        ].map((section, index) => (
          <motion.div
            key={section.title}
            variants={item}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full bg-gradient-to-br from-white to-green-50/30 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-teal-100/20">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <section.icon className="h-8 w-8 text-teal-500" />
                <CardTitle className="text-xl bg-gradient-to-br from-teal-700 to-emerald-500 bg-clip-text text-transparent">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700">
                  <p>
                    {index === 0
                      ? "Kami menganalisis kesehatan keuangan perusahaan melalui:"
                      : index === 1
                      ? "Kami menggunakan berbagai indikator untuk mengidentifikasi tren dan momentum:"
                      : index === 2
                      ? "Memanfaatkan machine learning untuk prediksi dan klasifikasi:"
                      : "Menganalisis persepsi pasar dan investor melalui:"}
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
