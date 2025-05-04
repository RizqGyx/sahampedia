import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";

const ActionButtons = ({ symbol }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `../data/dataset_${symbol?.toUpperCase()}_Original.csv`;
    link.download = `dataset_${symbol?.toUpperCase()}_Original.csv`;
    link.click();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: "Lihat prediksi saham ini!",
          url: window.location.href,
        });
      } else {
        alert("Fitur berbagi tidak didukung di browser ini.");
      }
    } catch (error) {
      console.error("Gagal membagikan:", error);
    }
  };

  return (
    <div className="flex space-x-2">
      <Button
        size="sm"
        variant="outline"
        className="text-gray-700 dark:text-gray-300 border-gray-200 cursor-pointer dark:border-gray-700"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4 mr-1" /> Bagikan
      </Button>
      <Button
        size="sm"
        className="bg-blue-600 dark:bg-blue-700 text-white cursor-pointer"
        onClick={handleDownload}
      >
        <Download className="h-4 w-4 mr-1" /> Unduh Dataset
      </Button>
    </div>
  );
};

export default ActionButtons;
