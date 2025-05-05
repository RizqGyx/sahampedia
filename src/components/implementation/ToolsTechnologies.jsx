import React from "react";
import { Code, Server, Database, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export const ToolsTechnologies = () => {
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
    <section id="tools" className="scroll-mt-24">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent mb-6"
      >
        Alat & Teknologi
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-gray-700 mb-6 dark:text-white"
      >
        SahamPedia Insight Hub dibangun dengan teknologi modern yang
        memungkinkan skalabilitas, keandalan, dan pengalaman pengguna yang
        mulus.
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
            icon: Code,
            title: "Frontend",
            items: [
              "<strong>React.js</strong> - Library utama untuk membangun UI interaktif",
              "<strong>Tailwind CSS</strong> - Framework CSS untuk desain responsif",
              "<strong>Recharts</strong> - Library untuk visualisasi data dan grafik saham",
              "<strong>Shadcn/ui</strong> - Komponen UI modern berbasis Tailwind untuk tampilan yang konsisten dan elegan",
              "<strong>Vite</strong> - Build tool untuk pengembangan yang cepat",
            ],
          },
          {
            icon: Server,
            title: "Backend",
            items: [
              "<strong>FastAPI</strong> - Framework Python untuk API ML",
              "<strong>RASA</strong> - Platform open-source untuk chatbot cerdas",
            ],
          },
          {
            icon: BarChart,
            title: "Data & AI",
            items: [
              "<strong>Python</strong> - Bahasa utama untuk analisis data dan ML",
              "<strong>TensorFlow & Keras</strong> - Framework deep learning",
              "<strong>Pandas & NumPy</strong> - Manipulasi dan analisis data",
              "<strong>Scikit-learn</strong> - Algoritma machine learning klasik",
            ],
          },
        ].map((section, index) => (
          <motion.div
            key={section.title}
            variants={item}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-amber-100/20">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <section.icon className="h-8 w-8 text-amber-500" />
                <CardTitle className="text-xl bg-gradient-to-br from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-white">
                  {section.items.map((item, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
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
