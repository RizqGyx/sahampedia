import React from "react";
import { FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const ImplementationHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 text-white p-8 md:p-12 mb-12"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-br from-transparent to-black/30"></div>

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
            <FileText className="h-12 w-12 text-blue-200" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
        >
          Implementasi Teknis SahamPedia
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-blue-100 max-w-3xl mx-auto text-center"
        >
          Penjelasan mendetail tentang infrastruktur, metodologi, dan teknologi
          di balik platform analisis saham blue chip kami.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={() =>
              document
                .getElementById("architecture")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center space-x-2 cursor-pointer bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <span>Mulai Membaca</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
