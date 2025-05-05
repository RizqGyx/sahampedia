import React from "react";
import { Globe, BarChart3, RefreshCw, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export const DataSources = () => {
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
    <section id="data-sources" className="scroll-mt-24">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6"
      >
        Sumber Data
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-gray-700 mb-6 dark:text-white"
      >
        SahamPedia Insight Hub mengumpulkan dan mengintegrasikan data dari
        berbagai sumber untuk memberikan analisis komprehensif tentang saham
        blue chip Indonesia.
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
            icon: Globe,
            title: "Sumber Data",
            description: "Data Penelitian",
            items: [
              "Bursa Efek Indonesia (IDX) untuk data saham",
              "Rasa untuk data dokumentasi pemakaian",
              "Yahoo Finance untuk data historis jangka panjang",
              "Kaggle Referensi penggunaan LSTM",
              "Goggle scholar untuk referensi penelitian",
            ],
          },
        ].map((section, index) => (
          <motion.div
            key={section.title}
            variants={item}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-blue-100/20">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <section.icon className="h-8 w-8 text-blue-500" />
                <div>
                  <CardTitle className="text-xl bg-gradient-to-br from-blue-700 to-cyan-500 bg-clip-text text-transparent">
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
