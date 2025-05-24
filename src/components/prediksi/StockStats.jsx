import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

export const StockStats = ({ data }) => {
  const isLoading = !data || !data.evaluation;

  const stats = isLoading
    ? Array(6).fill({ metric: "Loading...", value: "Loading..." })
    : [
        { metric: "Model Type", value: "LSTM (Long Short-Term Memory)" },
        { metric: "Dataset Range", value: "1 January 2019 - 9 October 2024" },
        { metric: "Training Data", value: "80%" },
        { metric: "Test Data", value: "20%" },
        { metric: "Note", value: data.evaluation.note },
        {
          metric: "Prediction Accuracy",
          value: `${data.evaluation.accuracy_percent}%`,
        },
        { metric: "MAE (Normalized)", value: data.evaluation.mae_scaled },
        { metric: "MAE (Rupiah)", value: data.evaluation.mae_rupiah },
        { metric: "RMSE (Normalized)", value: data.evaluation.rmse_scaled },
        { metric: "RMSE (Rupiah)", value: data.evaluation.rmse_rupiah },
      ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((stat, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {isLoading ? (
                    <Skeleton className="h-4 w-48" />
                  ) : (
                    <>
                      {stat.metric}
                      {(stat.metric === "MAE (Normalized)" ||
                        stat.metric === "RMSE (Normalized)") && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="ml-2 w-6 h-6 rounded-full text-white bg-blue-500 hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600">
                                ?
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {stat.metric === "MAE (Normalized)"
                                  ? "Mean Absolute Error"
                                  : "Root Mean Square Error"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {isLoading ? (
                    <Skeleton className="h-4 w-24 ml-auto" />
                  ) : (
                    stat.value
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
