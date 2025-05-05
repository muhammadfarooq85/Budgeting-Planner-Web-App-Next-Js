"use client";

import { Bar, BarChart, XAxis } from "recharts";

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
  { date: "2024-08-15", income: 450, expense: 300 },
  { date: "2024-03-16", income: 380, expense: 420 },
  { date: "2024-04-17", income: 520, expense: 120 },
  { date: "2024-02-18", income: 140, expense: 550 },
  { date: "2024-03-19", income: 600, expense: 350 },
  { date: "2024-09-20", income: 480, expense: 400 },
];

const chartConfig = {
  income: {
    label: "income",
    color: "#a8be90",
  },
  expense: {
    label: "expense",
    color: "#636c59",
  },
} satisfies ChartConfig;

export function MonthWiseIncomeExpense() {
  return (
    <Card className="!bg-[#fbfcf7]">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Income - Expense</CardTitle>
        <CardDescription className="text-md sm:text-lg">
          Month Wise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={true}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-PK", {
                  month: "short",
                });
              }}
            />
            <Bar
              dataKey="income"
              stackId="a"
              fill="#a8be90"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="expense"
              stackId="b"
              fill="#636c59"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-[180px]"
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                        style={{
                          backgroundColor:
                            chartConfig[name as keyof typeof chartConfig]
                              ?.color,
                        }}
                      />
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                        <span className="font-normal text-muted-foreground">
                          $
                        </span>
                      </div>
                      {index === 1 && (
                        <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                          Total
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {item.payload.income + item.payload.expense}
                            <span className="font-normal text-muted-foreground">
                              $
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                />
              }
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
