import React, { useEffect, useState } from "react";
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
  ExternalLink,
  BookText,
  Calendar,
  Users2,
  FileWarning,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/useFetch";

const Reference = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const { data, loading, error, get } = useFetch();

  useEffect(() => {
    get("http://127.0.0.1:5000/api/v1/journals");
  }, []);

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

  // Handle the "Load More" button click
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const years = data?.journals?.map((journal) => journal.year);
  const minYear = years && years.length > 0 ? Math.min(...years) : null;
  const maxYear = years && years.length > 0 ? Math.max(...years) : null;

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
                  {data && data.journals.length > 0 ? data.journals.length : 0}{" "}
                  Jurnal
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">
                  {minYear && maxYear
                    ? `${minYear}-${maxYear}`
                    : "Data tidak tersedia"}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {loading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                <div className="absolute inset-3 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Memuat Data Referensi...
              </p>
            </div>
          </div>
        ) : data && data.journals.length > 0 ? (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {data.journals.slice(0, visibleCount).map((journal, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full glass-effect flex justify-between hover:shadow-lg transition-all duration-300 border-violet-200/20">
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

            {visibleCount < data.journals.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-8"
              >
                <Button
                  onClick={loadMore}
                  className="px-8 py-4 cursor-pointer text-lg"
                >
                  Load More
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <FileWarning className="relative w-16 h-16" />
              <p className="text-gray-600 dark:text-gray-300">
                Data Referensi Tidak Ditemukan
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reference;
