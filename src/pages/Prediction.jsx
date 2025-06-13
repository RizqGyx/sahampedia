import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { StockChart } from "@/components/prediksi/StockChart";
import { StockInfo } from "@/components/prediksi/StockInfo";
import { StockStats } from "@/components/prediksi/StockStats";
import { Calendar, TrendingUp, AlertCircle, FileWarning } from "lucide-react";
import StockSelector from "@/components/prediksi/StockSelector";
import { stockDescriptions } from "@/lib/constants";
import ActionButtons from "@/components/prediksi/ActionButtons";
import useFetch from "@/hooks/useFetch";

const Prediction = () => {
  const { post, loading, error, data } = useFetch();
  const { symbol } = useParams();
  const [scrolled, setScrolled] = useState(false);
  const [selectedStock, setSelectedStock] = useState(symbol || "bbca");
  const [selectedDays, setSelectedDays] = useState(7);

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePost = () => {
    const body = {
      stock_code: selectedStock.toUpperCase(),
      start_date: new Date().toISOString().split("T")[0],
      days: selectedDays,
    };

    post("http://127.0.0.1:5000/predict", body);
  };

  useEffect(() => {
    handlePost();
  }, [symbol, selectedDays, selectedStock]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stockDescription =
    stockDescriptions[symbol] || stockDescriptions.default;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                <div className="absolute inset-3 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Memuat Data Prediksi...
              </p>
            </div>
          </div>
        )}

        {!loading && (
          <>
            <div
              className="sticky top-16 z-30 px-4 py-3 mb-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-md rounded-b-2xl transition-all duration-300"
              style={{
                opacity: scrolled ? 1 : 0,
                transform: scrolled ? "translateY(0)" : "translateY(-100%)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {symbol?.toUpperCase()}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Prediksi Harga
                    </p>
                  </div>
                </div>
                <ActionButtons symbol={symbol} />
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                      {symbol?.toUpperCase()} Price Prediction
                    </h1>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm space-x-3">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Today: {today}
                      </span>
                    </div>
                  </div>

                  <ActionButtons symbol={symbol} />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    AI-powered stock price predictions for{" "}
                    {symbol?.toUpperCase()} using LSTM. Forecast for{" "}
                    {selectedDays} days. {stockDescription}
                  </p>
                </div>

                <StockSelector
                  selectedStock={selectedStock}
                  onStockChange={setSelectedStock}
                  selectedDays={selectedDays}
                  onDaysChange={setSelectedDays}
                />
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <StockChart
                    data={data?.predictions?.length ? data : null}
                    days={selectedDays}
                  />
                </div>
                <div>
                  <StockInfo data={data?.predictions?.length ? data : null} />
                </div>
              </div>

              <StockStats data={data?.predictions?.length ? data : null} />

              {/* Jika tidak ada data */}
              {!data?.predictions?.length && (
                <div className="flex items-center justify-center p-10 text-center text-muted-foreground text-sm border border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                  Tidak ada data prediksi yang tersedia untuk saham ini.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Prediction;
