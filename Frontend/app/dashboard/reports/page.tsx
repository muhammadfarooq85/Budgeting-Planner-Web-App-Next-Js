// Libraries Imports
import {
  Backpack,
  Cpu,
  DatabaseBackup,
  HandCoins,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
// Local Imports
import ReportsCards from "@/components/reports-cards";
import { ThirtyDaysIncomeExpenseChart } from "@/components/thirty-days-income-expense";

export default function Reports() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 xl:grid-cols-3">
              <ReportsCards
                title="Invoicing Rate"
                icon={<TrendingUp />}
                amount={9}
                description="vs. Previous Month"
                symbol="%"
                symbolPosition="right"
              />
              <ReportsCards
                title="Forecasted Revenue"
                icon={<DatabaseBackup />}
                amount={4.132}
                description="vs. Previous Month"
                symbol="$"
                symbolPosition="left"
              />
              <ReportsCards
                title="Projected Profits"
                icon={<HandCoins />}
                amount={2.971}
                description="vs. Previous Month"
                symbol="$"
                symbolPosition="left"
              />
            </div>
            <div className="px-4 lg:px-6">
              <ThirtyDaysIncomeExpenseChart />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 xl:grid-cols-3">
              <ReportsCards
                title="Total Expenses"
                icon={<ShoppingBag />}
                amount={4.78}
                description="vs. Previous Month"
                symbol="$"
                symbolPosition="left"
              />
              <ReportsCards
                title="Forecasted Expenses"
                icon={<Backpack />}
                amount={5.852}
                description="vs. Previous Month"
                symbol="$"
                symbolPosition="left"
              />
              <ReportsCards
                title="Projected Expenses"
                icon={<Cpu />}
                amount={6.134}
                description="vs. Previous Month"
                symbol="$"
                symbolPosition="left"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
