import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, GraduationCap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const StockInfo = ({ data }) => {
  const isLoading = !data || !data.predictions || !data.evaluation;

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

  const startPrice = !isLoading ? data.predictions[0].predicted_price : null;
  const endPrice = !isLoading
    ? data.predictions[data.predictions.length - 1].predicted_price
    : null;
  const percentageChange = !isLoading
    ? calculatePercentageChange(startPrice, endPrice)
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isLoading ? (
            <Skeleton className="h-6 w-48" />
          ) : (
            `${data.stock?.toUpperCase()} Prediction Overview`
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Price</span>
          <span className="text-lg font-semibold">
            {isLoading ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              formatRupiah(startPrice)
            )}
          </span>
        </div>

        {/* Last-Day Prediction */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Last-Day Prediction</span>
          <div className="flex items-center gap-1">
            {isLoading ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <>
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
                  {formatRupiah(endPrice)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Predicted Change */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Predicted Change</span>
          <span
            className={`font-semibold ${
              !isLoading && startPrice < endPrice
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {isLoading ? <Skeleton className="h-4 w-16" /> : percentageChange}
          </span>
        </div>

        {/* Confidence Score */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Confidence Score</span>
          <div className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4 text-blue-500" />
            <span className="font-semibold">
              {isLoading ? (
                <Skeleton className="h-4 w-12" />
              ) : (
                `${data.evaluation.accuracy_percent}%`
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
