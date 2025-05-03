import React from "react";
import { MessageSquare, Bot, Workflow, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export const ChatbotImplementation = () => {
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
    <section id="chatbot" className="scroll-mt-24">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-6"
      >
        Implementasi Chatbot dengan RASA
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-gray-700 mb-6"
      >
        SahamPedia menggunakan RASA, platform open-source untuk membangun
        chatbot yang cerdas dan kontekstual, memberikan dukungan dan informasi
        saham secara real-time kepada pengguna.
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
            icon: Bot,
            title: "Arsitektur RASA",
            items: [
              "RASA NLU untuk pemahaman bahasa alami dan ekstraksi entitas",
              "RASA Core untuk manajemen dialog dan pemilihan respons",
              "Custom actions untuk mengakses API data saham eksternal",
              "Tracker store untuk menyimpan riwayat percakapan",
              "Model bahasa Indonesia khusus untuk terminologi saham",
            ],
          },
          {
            icon: MessageSquare,
            title: "Fitur Chatbot",
            items: [
              "Pemantauan harga saham dan indeks real-time",
              "Informasi fundamental perusahaan blue chip",
              "Ringkasan analisis teknikal terbaru",
              "Pemberitahuan peristiwa pasar penting",
              "Jawaban atas pertanyaan edukasi pasar modal",
              "Rekomendasi saham berdasarkan profil risiko",
            ],
          },
          {
            icon: Workflow,
            title: "Alur Percakapan",
            items: [
              "Intent recognition untuk mengidentifikasi tujuan pengguna",
              "Slot filling untuk mengumpulkan parameter yang diperlukan",
              "Context management untuk percakapan multi-turn",
              "Fallback handling untuk pertanyaan di luar domain",
              "Dialog aktif dengan klarifikasi dan saran proaktif",
            ],
          },
          {
            icon: Cpu,
            title: "Pengembangan & Pelatihan",
            items: [
              "Data training dari ribuan percakapan pasar modal",
              "Pelatihan model NLU dengan contoh kalimat bahasa Indonesia",
              "Pengembangan stories untuk alur percakapan yang alami",
              "Integrasi dengan API data saham dan berita",
              "Pelatihan berkelanjutan berdasarkan interaksi pengguna nyata",
            ],
          },
        ].map((section, index) => (
          <motion.div
            key={section.title}
            variants={item}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-purple-100/20">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <section.icon className="h-8 w-8 text-indigo-500" />
                <CardTitle className="text-xl bg-gradient-to-br from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700">
                  <p>
                    {index === 0
                      ? "Komponen utama implementasi RASA kami:"
                      : index === 1
                      ? "Kemampuan chatbot SahamPedia meliputi:"
                      : index === 2
                      ? "Kami menerapkan alur percakapan dinamis:"
                      : "Proses pengembangan chatbot kami melibatkan:"}
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
