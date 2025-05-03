import React from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Book,
  Link as LinkIcon,
  ExternalLink,
  BookText,
  Calendar,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reference = () => {
  const journalSources = [
    {
      title: "Prediksi Harga Saham Menggunakan LSTM",
      authors: "Ahmad Rizki, Budi Santoso",
      journal: "Jurnal Informatika dan Sistem Informasi",
      year: 2023,
      volume: "Vol. 15, No. 2",
      url: "https://example.com/journal1",
      description:
        "Penelitian tentang penggunaan Long Short-Term Memory (LSTM) untuk memprediksi harga saham blue chip Indonesia.",
    },
    {
      title: "Analisis Fundamental Saham Blue Chip Indonesia",
      authors: "Siti Nurhaliza, Joko Widodo",
      journal: "Jurnal Ekonomi dan Bisnis",
      year: 2022,
      volume: "Vol. 8, No. 3",
      url: "https://example.com/journal2",
      description:
        "Studi komprehensif tentang analisis fundamental saham-saham blue chip di Bursa Efek Indonesia.",
    },
    {
      title: "Penerapan Chatbot AI dalam Konsultasi Investasi Saham",
      authors: "Dimas Prayoga, Ratna Dewi",
      journal: "Jurnal Kecerdasan Buatan Indonesia",
      year: 2023,
      volume: "Vol. 4, No. 1",
      url: "https://example.com/journal3",
      description:
        "Penelitian tentang pengembangan dan implementasi chatbot AI untuk konsultasi investasi saham.",
    },
    {
      title: "Perbandingan Metode Machine Learning untuk Prediksi Saham",
      authors: "Eka Putra, Dewi Fortuna",
      journal: "Jurnal Ilmu Komputer",
      year: 2022,
      volume: "Vol. 12, No. 4",
      url: "https://example.com/journal4",
      description:
        "Studi komparatif tentang berbagai metode machine learning dalam memprediksi harga saham.",
    },
    {
      title: "Analisis Teknikal Saham BBCA dan BBRI",
      authors: "Surya Darma, Indra Kusuma",
      journal: "Jurnal Pasar Modal Indonesia",
      year: 2023,
      volume: "Vol. 7, No. 2",
      url: "https://example.com/journal5",
      description:
        "Analisis mendalam tentang pola teknikal pada saham BBCA dan BBRI selama periode 2020-2023.",
    },
  ];

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
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-violet-600 to-blue-600 p-8 md:p-12 mb-12 text-white"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-br from-transparent to-black/30"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <Book className="h-12 w-12 text-blue-200" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text"
            >
              Referensi Jurnal dan Sumber
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto text-center"
            >
              Daftar referensi jurnal dan sumber yang digunakan dalam
              pengembangan platform SahamPedia Insight Hub.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4 mt-8"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <BookText className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">
                  {journalSources.length} Jurnal
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">2022-2023</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Users2 className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">10+ Peneliti</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-lg mx-auto mb-8 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="all" className="flex-1">
              Semua Jurnal
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex-1">
              Teknikal
            </TabsTrigger>
            <TabsTrigger value="fundamental" className="flex-1">
              Fundamental
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {journalSources.map((journal, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full glass-effect hover:shadow-lg transition-all duration-300 border-violet-200/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl bg-gradient-to-br from-violet-700 to-blue-700 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent">
                            {journal.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <Users2 className="h-4 w-4 text-violet-500" />
                            {journal.authors}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300"
                        >
                          {journal.year}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2 text-gray-600 dark:text-gray-300">
                        {journal.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-4 gap-2">
                        <BookText className="h-4 w-4 text-violet-500" />
                        <span>
                          {journal.journal}, {journal.volume}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group"
                        asChild
                      >
                        <a
                          href={journal.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <span>Lihat Jurnal</span>
                          <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="technical">
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              Konten teknikal akan segera hadir
            </div>
          </TabsContent>

          <TabsContent value="fundamental">
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              Konten fundamental akan segera hadir
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reference;
