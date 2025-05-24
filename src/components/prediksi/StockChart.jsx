import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  predicted_price: {
    label: "Predicted Price",
    color: "#2563eb",
  },
};

export const StockChart = ({ data, days }) => {
  const isLoading = !data || !data.predictions || data.predictions.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>LSTM Price Prediction</span>
            <div className="text-sm font-normal text-muted-foreground">
              Next {days} days
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-[16/9] w-full">
            {isLoading ? (
              <Skeleton className="w-full h-full rounded-lg" />
            ) : (
              <ChartContainer config={chartConfig}>
                <AreaChart
                  data={data.predictions}
                  margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
                >
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={true}
                    stroke="#888888"
                    fontSize={11}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={true}
                    stroke="#888888"
                    fontSize={12}
                    tickFormatter={(value) => `Rp${value.toLocaleString()}`}
                    domain={["dataMin - 200", "dataMax + 200"]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="predicted_price"
                    stroke="#2563eb"
                    fill="url(#gradient)"
                    strokeWidth={2}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
