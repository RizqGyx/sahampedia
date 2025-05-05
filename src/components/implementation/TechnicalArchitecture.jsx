import React from "react";
import { Server, Database, LayoutGrid, BrainCircuit } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export const TechnicalArchitecture = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="architecture" className="scroll-mt-16">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-6"
      >
        Arsitektur Teknis
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-gray-700 mb-6 dark:text-white"
      >
        SahamPedia Insight Hub dibangun dengan arsitektur modern yang terdiri
        dari beberapa lapisan untuk memastikan performa, keamanan, dan
        skalabilitas.
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
            icon: LayoutGrid,
            title: "Frontend & UI",
            description: "Antarmuka pengguna dan visualisasi",
            items: [
              "Aplikasi web responsif dengan React",
              "Visualisasi data interaktif dengan Recharts",
              "Design system yang konsisten untuk pengalaman pengguna yang menyatu",
            ],
          },
          {
            icon: BrainCircuit,
            title: "AI & Machine Learning",
            description: "Model dan prediksi",
            items: [
              "API prediksi untuk integrasi dengan frontend",
              "Natural Language Processing (NLP) untuk analisis chatbot",
              "Sistem prediksi harga saham berbasis LSTM",
            ],
          },
        ].map((section, index) => (
          <motion.div key={section.title} variants={item} className="h-full">
            <Card className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-violet-100/20">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <section.icon className="h-8 w-8 text-violet-600" />
                <div>
                  <CardTitle className="text-xl bg-gradient-to-br from-violet-700 to-blue-700 bg-clip-text text-transparent">
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-white">
                  {section.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
