"use client";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "2024-04-01", income: 222, expense: 150 },
  { date: "2024-04-02", income: 97, expense: 180 },
  { date: "2024-04-03", income: 167, expense: 120 },
  { date: "2024-04-04", income: 242, expense: 260 },
  { date: "2024-04-05", income: 373, expense: 290 },
  { date: "2024-04-06", income: 301, expense: 340 },
  { date: "2024-04-07", income: 245, expense: 180 },
  { date: "2024-04-08", income: 409, expense: 320 },
  { date: "2024-04-09", income: 59, expense: 110 },
  { date: "2024-04-10", income: 261, expense: 190 },
  { date: "2024-04-11", income: 327, expense: 350 },
  { date: "2024-04-12", income: 292, expense: 210 },
  { date: "2024-04-13", income: 342, expense: 380 },
  { date: "2024-04-14", income: 137, expense: 220 },
  { date: "2024-04-15", income: 120, expense: 170 },
  { date: "2024-04-16", income: 138, expense: 190 },
  { date: "2024-04-17", income: 446, expense: 360 },
  { date: "2024-04-18", income: 364, expense: 410 },
  { date: "2024-04-19", income: 243, expense: 180 },
  { date: "2024-04-20", income: 89, expense: 150 },
  { date: "2024-04-21", income: 137, expense: 200 },
  { date: "2024-04-22", income: 224, expense: 170 },
  { date: "2024-04-23", income: 138, expense: 230 },
  { date: "2024-04-24", income: 387, expense: 290 },
  { date: "2024-04-25", income: 215, expense: 250 },
  { date: "2024-04-26", income: 75, expense: 130 },
  { date: "2024-04-27", income: 383, expense: 420 },
  { date: "2024-04-28", income: 122, expense: 180 },
  { date: "2024-04-29", income: 315, expense: 240 },
  { date: "2024-04-30", income: 454, expense: 380 },
  { date: "2024-05-01", income: 165, expense: 220 },
  { date: "2024-05-02", income: 293, expense: 310 },
  { date: "2024-05-03", income: 247, expense: 190 },
  { date: "2024-05-04", income: 385, expense: 420 },
  { date: "2024-05-05", income: 481, expense: 390 },
  { date: "2024-05-06", income: 498, expense: 520 },
  { date: "2024-05-07", income: 388, expense: 300 },
  { date: "2024-05-08", income: 149, expense: 210 },
  { date: "2024-05-09", income: 227, expense: 180 },
  { date: "2024-05-10", income: 293, expense: 330 },
  { date: "2024-05-11", income: 335, expense: 270 },
  { date: "2024-05-12", income: 197, expense: 240 },
  { date: "2024-05-13", income: 197, expense: 160 },
  { date: "2024-05-14", income: 448, expense: 490 },
  { date: "2024-05-15", income: 473, expense: 380 },
  { date: "2024-05-16", income: 338, expense: 400 },
  { date: "2024-05-17", income: 499, expense: 420 },
  { date: "2024-05-18", income: 315, expense: 350 },
  { date: "2024-05-19", income: 235, expense: 180 },
  { date: "2024-05-20", income: 177, expense: 230 },
  { date: "2024-05-21", income: 82, expense: 140 },
  { date: "2024-05-22", income: 81, expense: 120 },
  { date: "2024-05-23", income: 252, expense: 290 },
  { date: "2024-05-24", income: 294, expense: 220 },
  { date: "2024-05-25", income: 201, expense: 250 },
  { date: "2024-05-26", income: 213, expense: 170 },
  { date: "2024-05-27", income: 420, expense: 460 },
  { date: "2024-05-28", income: 233, expense: 190 },
  { date: "2024-05-29", income: 78, expense: 130 },
  { date: "2024-05-30", income: 340, expense: 280 },
  { date: "2024-05-31", income: 178, expense: 230 },
  { date: "2024-06-01", income: 178, expense: 200 },
  { date: "2024-06-02", income: 470, expense: 410 },
  { date: "2024-06-03", income: 103, expense: 160 },
  { date: "2024-06-04", income: 439, expense: 380 },
  { date: "2024-06-05", income: 88, expense: 140 },
  { date: "2024-06-06", income: 294, expense: 250 },
  { date: "2024-06-07", income: 323, expense: 370 },
  { date: "2024-06-08", income: 385, expense: 320 },
  { date: "2024-06-09", income: 438, expense: 480 },
  { date: "2024-06-10", income: 155, expense: 200 },
  { date: "2024-06-11", income: 92, expense: 150 },
  { date: "2024-06-12", income: 492, expense: 420 },
  { date: "2024-06-13", income: 81, expense: 130 },
  { date: "2024-06-14", income: 426, expense: 380 },
  { date: "2024-06-15", income: 307, expense: 350 },
  { date: "2024-06-16", income: 371, expense: 310 },
  { date: "2024-06-17", income: 475, expense: 520 },
  { date: "2024-06-18", income: 107, expense: 170 },
  { date: "2024-06-19", income: 341, expense: 290 },
  { date: "2024-06-20", income: 408, expense: 450 },
  { date: "2024-06-21", income: 169, expense: 210 },
  { date: "2024-06-22", income: 317, expense: 270 },
  { date: "2024-06-23", income: 480, expense: 530 },
  { date: "2024-06-24", income: 132, expense: 180 },
  { date: "2024-06-25", income: 141, expense: 190 },
  { date: "2024-06-26", income: 434, expense: 380 },
  { date: "2024-06-27", income: 448, expense: 490 },
  { date: "2024-06-28", income: 149, expense: 200 },
  { date: "2024-06-29", income: 103, expense: 160 },
  { date: "2024-06-30", income: 446, expense: 400 },
];

const chartConfig = {
  views: {
    label: "Total",
  },
  income: {
    label: "income",
    color: "#a8be90",
  },
  expense: {
    label: "expense",
    color: "#636c59",
  },
} satisfies ChartConfig;

export function ThirtyDaysIncomeExpenseChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("income");

  const total = React.useMemo(
    () => ({
      income: chartData.reduce((acc, curr) => acc + curr.income, 0),
      expense: chartData.reduce((acc, curr) => acc + curr.expense, 0),
    }),
    []
  );

  return (
    <Card className="!bg-[#fbfcf7]">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-xl sm:text-2xl">
            Income - Expense
          </CardTitle>
          <CardDescription className="text-md sm:text-lg">
            Last 30 Days
          </CardDescription>
        </div>
        <div className="flex">
          {["income", "expense"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-md">{chartConfig[chart].label}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={false}
              tickMargin={10}
              minTickGap={30}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-PK", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-PK", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
