// app/dashboard/page.tsx
"use client";
import { SectionCards } from "@/components/section-cards";
import { ThirtyDaysIncomeExpenseChart } from "@/components/thirty-days-income-expense";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ThirtyDaysIncomeExpenseChart />
          </div>
        </div>
      </div>
    </div>
  );
}
