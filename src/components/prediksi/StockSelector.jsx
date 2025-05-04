import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StockSelector = ({
  selectedStock,
  onStockChange,
  selectedDays,
  onDaysChange,
}) => {
  const navigate = useNavigate();

  const stockOptions = [
    { value: "bbca", label: "BBCA" },
    { value: "bbri", label: "BBRI" },
    { value: "bbni", label: "BBNI" },
    { value: "bmri", label: "BMRI" },
  ];

  const dayOptions = [
    { value: 3, label: "3 Hari" },
    { value: 7, label: "7 Hari" },
    { value: 14, label: "14 Hari" },
    { value: 30, label: "30 Hari" },
  ];

  const handleStockChange = (newSymbol) => {
    onStockChange(newSymbol);
    navigate(`/prediction/${newSymbol}`);
  };

  const handleDaysChange = (days) => {
    onDaysChange(days);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
      {/* Stock Selector */}
      <div className="w-full md:w-1/2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Pilih Saham
        </label>
        <Select value={selectedStock} onValueChange={handleStockChange}>
          <SelectTrigger className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg cursor-pointer shadow-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 transition duration-300">
            <SelectValue placeholder="Pilih Saham" />
          </SelectTrigger>
          <SelectContent>
            {stockOptions.map((stock) => (
              <SelectItem key={stock.value} value={stock.value}>
                {stock.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Days Selector */}
      <div className="w-full md:w-1/2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Durasi Prediksi
        </label>
        <Select value={selectedDays} onValueChange={handleDaysChange}>
          <SelectTrigger className="w-full px-4 py-2 border-2 border-gray-300 cursor-pointer rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 transition duration-300">
            <SelectValue placeholder="Pilih Durasi" />
          </SelectTrigger>
          <SelectContent>
            {dayOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StockSelector;
