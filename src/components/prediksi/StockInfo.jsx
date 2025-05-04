import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, GraduationCap } from "lucide-react";

export const StockInfo = ({ data }) => {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const calculatePercentageChange = (startPrice, endPrice) => {
    if (!startPrice || !endPrice) return "0%";
    const change = ((endPrice - startPrice) / startPrice) * 100;
    return `${change.toFixed(2)}%`;
  };
  const startPrice = data.predictions[0].predicted_price;
  const endPrice =
    data.predictions[data.predictions.length - 1].predicted_price;
  const percentageChange = calculatePercentageChange(startPrice, endPrice);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.stock?.toUpperCase()} Prediction Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Price</span>
          <span className="text-lg font-semibold">
            {formatRupiah(data.predictions[0].predicted_price)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Last-Day Prediction</span>
          <div className="flex items-center gap-1">
            {startPrice < endPrice ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`font-semibold ${
                startPrice < endPrice ? "text-green-500" : "text-red-500"
              }`}
            >
              {formatRupiah(
                data.predictions[data.predictions.length - 1].predicted_price
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Predicted Change</span>
          <span
            className={`font-semibold ${
              startPrice < endPrice ? "text-green-500" : "text-red-500"
            }`}
          >
            {percentageChange}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Confidence Score</span>
          <div className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4 text-blue-500" />
            <span className="font-semibold">
              {data.evaluation.accuracy_percent}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
