"use client";
// Local Imports
import { MonthWiseIncomeExpense } from "@/components/month-wise-income-expense";
import DashboardCards from "@/components/section-cards";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6">
          <DashboardCards />
          <div className="px-4 lg:px-6">
            <MonthWiseIncomeExpense />
          </div>
        </div>
      </div>
    </div>
  );
}
