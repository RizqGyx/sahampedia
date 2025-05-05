import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { TabTitle } from "@/lib/generalFunction";
import { featureWeb } from "@/lib/constants";
import useFetch from "@/hooks/useFetch";
import { StockCardSkeleton } from "@/components/home/StockCardSkeleton";
import { StockCard } from "@/components/home/StockCard";

const Home = () => {
  TabTitle("SahamPedia | Home");

  const heroRef = useRef(null);
  const { data, loading, error, get } = useFetch();
  useEffect(() => {
    get("http://127.0.0.1:5000/stocks");
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const moveX = (x - rect.width / 2) / 50;
      const moveY = (y - rect.height / 2) / 50;

      const elements = heroRef.current.querySelectorAll(".hero-element");
      elements.forEach((el, i) => {
        const htmlEl = el;
        const factor = (i + 1) * 0.2;
        htmlEl.style.transform = `translate(${moveX * factor}px, ${
          moveY * factor
        }px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Layout>
      <div
        ref={heroRef}
        className="relative py-24 md:py-32 overflow-hidden rounded-2xl mb-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800"></div>

        <div className="absolute hero-element top-1/4 -left-8 w-56 h-56 rounded-full bg-white/10 backdrop-blur-2xl"></div>
        <div className="absolute hero-element bottom-1/3 -right-20 w-64 h-64 rounded-full bg-white/5 backdrop-blur-xl"></div>
        <div className="absolute hero-element top-1/2 left-1/4 w-32 h-32 rounded-full bg-white/10 backdrop-blur-lg"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight [text-wrap:balance]">
            <span className="inline-block animate-fade-in [animation-delay:0.2s]">
              SahamPedia
            </span>{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 animate-fade-in [animation-delay:0.4s]">
                Insight
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-1 animate-fade-in [animation-delay:0.8s]"
                viewBox="0 0 100 1"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="0"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            <span className="inline-block animate-fade-in [animation-delay:0.6s]">
              Hub
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-white/90 animate-fade-in [animation-delay:0.8s] [text-wrap:balance]">
            Platform edukasi dan analisis saham blue chip Indonesia dengan
            dukungan AI untuk keputusan investasi yang lebih cerdas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in [animation-delay:1s]">
            <Button
              size="lg"
              variant="default"
              className="group bg-blue-600 cursor-pointer hover:bg-blue-700 text-white border-0 font-medium py-6 px-8 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Mulai Belajar
              <ChevronRight className="ml-1 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/implementation">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white cursor-pointer hover:bg-white/20 py-6 px-8 font-medium"
              >
                Lihat Implementasi
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Fitur Utama
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl">
              Analisis dan panduan investasi berkualitas untuk membantu Anda
              membuat keputusan saham yang lebih baik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureWeb.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: false }}
                className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>

                <div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${
                      feature.gradient.includes("blue")
                        ? "#3B82F6"
                        : feature.gradient.includes("purple")
                        ? "#8B5CF6"
                        : "#10B981"
                    }, ${
                      feature.gradient.includes("cyan")
                        ? "#06B6D4"
                        : feature.gradient.includes("pink")
                        ? "#EC4899"
                        : "#059669"
                    })`,
                  }}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10 rounded-3xl my-4  opacity-60"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                Saham Populer
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Pantau saham blue chip terpopuler di Indonesia di Bidang
                Perbankan
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <StockCardSkeleton key={idx} />
              ))
            ) : data && data.length > 0 ? (
              data.map((card, index) => (
                <StockCard key={card.stock} card={card} index={index} />
              ))
            ) : (
              <h1 className="col-span-full text-center text-gray-600 dark:text-gray-300">
                Tidak Ada Data Saham Tersedia Sekarang Ini
              </h1>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 my-10 relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900 dark:from-gray-900 dark:to-blue-950"></div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -top-1/2 -left-1/4 w-full h-full rounded-full bg-blue-400/30 blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-full h-full rounded-full bg-purple-400/30 blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Siap Memulai?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white/80">
            Tingkatkan strategi investasi saham blue chip Anda dengan analisis
            dan wawasan terbaik dari SahamPedia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="group bg-gradient-to-r cursor-pointer from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-200 py-6 px-8"
            >
              Mulai Tingkatkan
              <ChevronRight className="ml-1 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/implementation">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white cursor-pointer text-white hover:bg-white/20 py-6 px-8"
              >
                Detail Implementasi
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Home;
